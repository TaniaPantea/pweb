import os
import cv2
import timm
import torch
import base64
import numpy as np

from pathlib import Path
from src.explainability.gradcam import GradCAM


class RetinaPredictor:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        self.image_size = 512  # schimbă la 224/299 dacă așa ai antrenat modelul

        self.class_names = [
            "No DR",
            "Mild",
            "Moderate",
            "Severe",
            "Proliferative DR"
        ]

        project_root = Path(__file__).resolve().parents[2]

        self.model_path = project_root / "modelExperiments" / "newCNN" / "best_model_effnetb0_severity.pth"
        self.model = timm.create_model(
            "efficientnet_b0",
            pretrained=False,
            num_classes=5
        )

        self.model.load_state_dict(
            torch.load(self.model_path, map_location=self.device)
        )

        self.model.to(self.device)
        self.model.eval()

        self.gradcam = GradCAM(
            model=self.model,
            target_layer=self.model.conv_head,
            device=self.device
        )

    def preprocess_image(self, image_bytes):
        file_array = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(file_array, cv2.IMREAD_COLOR)

        if image is None:
            raise ValueError("Invalid image file.")

        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = cv2.resize(image, (self.image_size, self.image_size))

        original_image = image.astype(np.float32) / 255.0

        # Albumentations A.Normalize default:
        mean = np.array([0.485, 0.456, 0.406])
        std = np.array([0.229, 0.224, 0.225])

        normalized = (original_image - mean) / std

        tensor = torch.tensor(normalized, dtype=torch.float32)
        tensor = tensor.permute(2, 0, 1).unsqueeze(0)

        return tensor.to(self.device), original_image

    def create_heatmap_overlay(self, original_image, cam):
        heatmap = cv2.applyColorMap(
            np.uint8(255 * cam),
            cv2.COLORMAP_JET
        )

        heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
        heatmap = heatmap.astype(np.float32) / 255.0

        overlay = 0.55 * original_image + 0.45 * heatmap
        overlay = np.clip(overlay, 0, 1)

        overlay_uint8 = np.uint8(overlay * 255)

        _, buffer = cv2.imencode(
            ".png",
            cv2.cvtColor(overlay_uint8, cv2.COLOR_RGB2BGR)
        )

        heatmap_base64 = base64.b64encode(buffer).decode("utf-8")

        return heatmap_base64

    def predict(self, image_bytes):
        input_tensor, original_image = self.preprocess_image(image_bytes)

        with torch.no_grad():
            outputs = self.model(input_tensor)
            probabilities = torch.softmax(outputs, dim=1)[0]
            predicted_class = torch.argmax(probabilities).item()
            confidence = probabilities[predicted_class].item()

        cam, _ = self.gradcam.generate(
            input_tensor=input_tensor,
            class_idx=predicted_class,
            image_size=self.image_size
        )

        heatmap_base64 = self.create_heatmap_overlay(original_image, cam)

        return {
            "prediction_index": predicted_class,
            "prediction_label": self.class_names[predicted_class],
            "confidence": round(confidence, 4),
            "probabilities": {
                self.class_names[i]: round(probabilities[i].item(), 4)
                for i in range(len(self.class_names))
            },
            "heatmap_base64": heatmap_base64
        }
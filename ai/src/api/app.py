from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from src.inference.predict import RetinaPredictor


app = FastAPI(title="RetinaXAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = RetinaPredictor()


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "RetinaXAI API is running"
    }


@app.post("/predict")
async def predict_retinopathy(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()

        result = predictor.predict(image_bytes)

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
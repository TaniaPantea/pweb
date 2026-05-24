import axios from 'axios';
import FormData from 'form-data';
import { aiConfig } from '../config/aiConfig.js';
import analysisRepository from '../repositories/analysisRepository.js';

class AnalysisService {
    // REPARAT: Adăugăm parametrul metaData primit din controller
    async analyzeRetinaImage(file, metaData) {
        if (!file) {
            throw new Error('Nu a fost furnizat niciun fișier pentru analiză.');
        }

        const originalImageBase64 = file.buffer.toString('base64');

        const formData = new FormData();
        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
        });

        // Trimitere către modulul de AI (FastAPI)
        const aiResponse = await axios.post(aiConfig.aiServiceUrl, formData, {
            headers: { ...formData.getHeaders() }
        });

        const aiData = aiResponse.data;

        // Salvare reală în MongoDB prin Repository folosind datele din metaData (req.body)
        const savedRecord = await analysisRepository.saveResult({
            imageName: file.originalname,
            predictionLabel: aiData.prediction_label,
            predictionIndex: aiData.prediction_index,
            confidence: aiData.confidence,
            probabilities: aiData.probabilities,
            heatmapBase64: aiData.heatmap_base64,
            originalImageBase64: originalImageBase64,

            // REPARAT COMPLET: Nu mai apelăm req.body, ci citim curat din parametrul metaData
            age: metaData && metaData.age ? parseInt(metaData.age, 10) : 45,
            gender: metaData && metaData.gender ? metaData.gender : "Other",
            patientName: metaData && metaData.patientName ? metaData.patientName : "Anonymous Patient",

            isReviewed: false,
            doctorObservations: "",
            fidelityScore: aiModelOutput.fidelity || 0.82,
            stabilityScore: aiModelOutput.stability || 0.76,
            humanAgreementScore: aiModelOutput.human_agreement || 0.68,
            deletionAuc: aiModelOutput.deletion_auc || 0.81,
            insertionAuc: aiModelOutput.insertion_auc || 0.85
        });

        // Returnăm în frontend obiectul complet sincronizat cu ID-ul bazei de date și noile proprietăți
        return {
            _id: savedRecord._id,
            imageName: savedRecord.imageName,
            predictionLabel: savedRecord.predictionLabel,
            predictionIndex: savedRecord.predictionIndex,
            confidence: savedRecord.confidence,
            probabilities: savedRecord.probabilities,
            heatmapBase64: savedRecord.heatmapBase64,
            originalImageBase64: savedRecord.originalImageBase64,
            age: savedRecord.age,
            gender: savedRecord.gender,
            isReviewed: savedRecord.isReviewed,
            doctorObservations: savedRecord.doctorObservations,
            createdAt: savedRecord.createdAt
        };
    }

    async getHistory() {
        return await analysisRepository.getAllResults();
    }

    async reviewCase(id, observations, annotatedImage) {
        let cleanImage = null;
        if (annotatedImage) {
            cleanImage = annotatedImage.replace(/^data:image\/jpeg;base64,/, "");
        }

        return await analysisRepository.updateReview(id, observations, cleanImage);
    }
}

export default new AnalysisService();
import Analysis from '../models/Analysis.js';

class AnalysisRepository {
    // Salvează un nou raport în baza de date
    async saveResult(analysisData) {
        const newAnalysis = new Analysis(analysisData);
        return await newAnalysis.save();
    }

    // Aduce toate analizele din baza de date ordonate după cele mai recente
    async getAllResults() {
        return await Analysis.find().sort({ createdAt: -1 });
    }

    // Căutarea unei analize specifice după ID (util pentru pagina de detalii/review)
    async getById(id) {
        return await Analysis.findById(id);
    }

    // Actualizează analiza cu notele introduse de medic
    // În backend/src/repositories/analysisRepository.js:
    async updateReview(id, observations, cleanImage) {
        const updateFields = {
            doctorObservations: observations,
            isReviewed: true
        };

        // Salvăm imaginea modificată pe canvas într-un câmp nou dedicat adnotărilor!
        if (cleanImage) {
            updateFields.annotatedImageBase64 = cleanImage;
        }

        return await Analysis.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );
    }
}

export default new AnalysisRepository();
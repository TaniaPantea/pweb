import analysisService from '../services/analysisService.js';

class AnalysisController {

    async processUpload(req, res) {
        try {
            // Trimitem req.file (imaginea) ȘI req.body (age, gender transmise din Upload.jsx prin FormData)
            const result = await analysisService.analyzeRetinaImage(req.file, req.body);

            return res.status(200).json(result);
        } catch (error) {
            console.error("Eroare la procesarea upload-ului în Controller:", error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async fetchHistory(req, res) {
        try {
            const history = await analysisService.getHistory();
            return res.status(200).json(history);
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // MODIFICAT COMPLET PENTRU SINCROZINARE REPREZENTATIVĂ:
    async updateRecordReview(req, res) {
        try {
            const { id } = req.params;
            const { observations, annotatedImage } = req.body;

            // Trimitem totul către service pentru a păstra arhitectura curată
            const updated = await analysisService.reviewCase(id, observations, annotatedImage);

            return res.status(200).json({ success: true, data: updated });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default new AnalysisController();
import { Router } from 'express';
import multer from 'multer';
import analysisController from '../controllers/analysisController.js';

const router = Router();

// Configuram multer să țină fișierul în memorie ca Buffer temporar
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint-ul va fi localizat la POST /api/analysis/predict
router.post('/predict', upload.single('file'), analysisController.processUpload);

// ... codul existent rămâne neschimbat
router.post('/predict', upload.single('file'), analysisController.processUpload);

// Rută nouă pentru citirea istoricului din baza de date
router.get('/history', analysisController.fetchHistory);
// Ruta: PUT /api/analysis/review/:id
router.put('/review/:id', analysisController.updateRecordReview);

export default router;
import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

// Ruta: POST /api/auth/register
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;

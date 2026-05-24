import authService from '../services/authService.js';

class AuthController {
    async register(req, res) {
        try {
            const result = await authService.registerUser(req.body);
            return res.status(201).json({
                success: true,
                message: 'Utilizator înregistrat cu succes!',
                user: result
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.loginUser(email, password);
            return res.status(200).json({ success: true, ...result });
        } catch (error) {
            return res.status(401).json({ success: false, message: error.message });
        }
    }
}

export default new AuthController();
import express from 'express';
import cors from 'cors';
import speedRoutes from './routes/analysisRoutes.js';
import authRoutes from './routes/authRoutes.js'; // <--- IMPORTĂ NOILE RUTE

const app = express();

app.use(cors());
app.use(express.json()); // <--- IMPORTANT: Permite Express să citească JSON-ul trimis din frontend în req.body

// Înregistrarea rutelor
app.use('/api/analysis', speedRoutes);
app.use('/api/auth', authRoutes); // <--- ADAUGĂ LINIA ACEASTA

app.get('/health', (req, res) => {
    res.json({ status: 'Node.js backend is running smoothly' });
});

export default app;
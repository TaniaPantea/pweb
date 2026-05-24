import app from './src/app.js';
import connectDB from './src/config/db.js'; // <--- Importă conexiunea

const PORT = process.env.PORT || 5000;

// Conectează-te la MongoDB înainte de a porni serverul Express
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Serverul Express rulează pe portul http://localhost:${PORT}`);
    });
});
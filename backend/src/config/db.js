import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Înlocuiește cu URL-ul tău de MongoDB dacă folosești Atlas în producție
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/retinaxai';

        const conn = await mongoose.connect(mongoURI);
        console.log(`🍃 MongoDB Conectat: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Eroare la conectarea MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
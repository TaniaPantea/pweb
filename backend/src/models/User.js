import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Nu permite înregistrarea aceluiași email de două ori
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        default: 'patient' // Implicit, utilizatorii se înregistrează ca pacienți
    },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
}, {
    timestamps: true
});

// Middleware Mongoose: înainte de a salva documentul, criptăm parola dacă a fost modificată/creată
userSchema.pre('save', async function () {
    // Dacă parola nu a fost modificată, ne oprim direct (fără next)
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // Nu mai apelăm next() aici! Funcția async se termină natural.
    } catch (error) {
        // Dacă apare o eroare, o aruncăm (throw), iar Mongoose o va intercepta corect
        throw error;
    }
});

const User = mongoose.model('User', userSchema);
export default User;
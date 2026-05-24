import userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    async registerUser(userData) {
        // 1. MODIFICAT: Extragem și age, gender din datele venite din frontend (req.body)
        const { name, email, password, role, age, gender } = userData;

        // Verificăm dacă utilizatorul există deja
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Acest complet de email este deja asociat unui cont activ.');
        }

        // 2. MODIFICAT: Trimitem și age, gender către baza de date prin userRepository
        const newUser = await userRepository.createUser({
            name,
            email,
            password,
            role,
            age,
            gender
        });

        // 3. Returnăm datele utilizatorului, incluzând noile metadate în răspuns (fără parolă)
        return {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            age: newUser.age,
            gender: newUser.gender
        };
    }

    async loginUser(email, password) {
        // 1. Căutăm utilizatorul după email
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credențiale invalide. Verificați email-ul sau parola.');
        }

        // 2. Comparăm parola introdusă cu hash-ul criptat din MongoDB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Credențiale invalide. Verificați email-ul sau parola.');
        }

        // 3. Generăm token-ul de sesiune JWT (valabil 24 de ore)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret_cheie_temporara',
            { expiresIn: '24h' }
        );

        // 4. MODIFICAT: Returnăm și age, gender în obiectul user la login
        // Acest pas este vital pentru ca interfața să le poată stoca în localStorage!
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                age: user.age,
                gender: user.gender
            }
        };
    }
}

export default new AuthService();
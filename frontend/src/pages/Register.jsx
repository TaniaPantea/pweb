import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, ArrowRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        password: '',
        role: 'patient'
    });

    const colors = {
        primary: '#0D47A1',
        primaryDark: '#003178',
        inputBg: '#E5E7EB',
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (formData.age < 18 || formData.age > 100) {
            alert("Please enter a valid age between 18 and 100.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // MODIFICAT: Trimitem toate datele din formular, inclusiv age și gender ca proprietăți JSON
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    age: parseInt(formData.age, 10), // Convertim în număr
                    gender: formData.gender,
                    password: formData.password,
                    role: formData.role
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "A apărut o eroare la înregistrare.");
            }

            alert("Account created successfully!");
            navigate('/login');
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f3f4f6] p-6 text-left">
            <div className="flex w-full max-w-[1000px] min-h-[680px] bg-white rounded-[30px] overflow-hidden shadow-2xl">

                <div className="hidden lg:flex w-[45%] relative p-8 flex-col justify-between items-start">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/img.png')" }}
                    />
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            background: `linear-gradient(180deg, ${colors.primaryDark} 100%, ${colors.primary} 0%)`,
                            opacity: 0.88
                        }}
                    />
                    <div className="absolute top-10 left-10 z-20">
                        <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold", fontFamily: "'ADLaM Display', sans-serif" }}>
                            RetinaXAI
                        </h1>
                    </div>
                    <div className="relative z-20 flex items-center justify-center w-full h-full px-10">
                        <div className="w-[520px]">
                            <h2 style={{ color: "#ffffff", fontSize: "29px", fontWeight: "600", lineHeight: "1.2", fontFamily: "Manrope" }}>
                                Advanced AI Diagnostic Support for Retinal Health.
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-center p-12 bg-white">
                    <div className="w-full max-w-xs mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left" style={{ fontFamily: "'ADLaM Display', sans-serif" }}>
                            Register to RetinaXAI
                        </h2>

                        <form onSubmit={handleRegister} className="space-y-3">
                            <div className="flex flex-col items-start">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full p-2.5 bg-[#E5E7EB] rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-100 transition-all"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col items-start">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="clinician@hospital.org"
                                    className="w-full p-2.5 bg-[#E5E7EB] rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-100 transition-all"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col items-start">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Age</label>
                                    <input
                                        required
                                        name="age"
                                        type="number"
                                        min="18"
                                        max="100"
                                        placeholder="20"
                                        className="w-full p-2.5 bg-[#E5E7EB] rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-100 transition-all"
                                        value={formData.age}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col items-start">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Gender</label>
                                    <select
                                        required
                                        name="gender"
                                        className="w-full p-2.5 bg-[#E5E7EB] rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-100 transition-all text-gray-700 font-medium"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col items-start">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Account Type (Role)</label>
                                <select
                                    required
                                    name="role"
                                    className="w-full p-2.5 bg-[#E5E7EB] rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-100 transition-all text-gray-700 font-semibold"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="patient">Patient</option>
                                    <option value="doctor">Medical Doctor / Clinician</option>
                                </select>
                            </div>

                            <div className="flex flex-col items-start">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                                <div className="relative w-full">
                                    <input
                                        required
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full p-2.5 bg-[#E5E7EB] rounded-xl outline-none text-sm pr-10 focus:ring-2 focus:ring-blue-100 transition-all"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 transition-colors"
                                    >
                                        {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white py-3 rounded-full mt-4 flex items-center justify-center gap-2 hover:opacity-95 transition-all active:scale-[0.98]"
                                style={{
                                    background: `linear-gradient(90deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
                                    fontFamily: "Manrope",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    opacity: loading ? 0.7 : 1
                                }}
                            >
                                {loading ? "Creating Account..." : "Register"} <ArrowRightIcon size={16} />
                            </button>
                        </form>

                        <p className="mt-4 text-center text-xs text-gray-500">
                            Already have an account?{" "}
                            <span
                                className="text-[#0D47A1] font-bold cursor-pointer hover:underline"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
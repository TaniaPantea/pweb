import React, { useState } from 'react';
import { EyeIcon, ArrowRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const colors = {
        primary: '#0D47A1',
        primaryDark: '#003178',
        inputBg: '#E5E7EB',
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f3f4f6] p-6">

            {/* Card cu dimensiuni fixe pentru a fi compact */}
            <div className="flex w-full max-w-[1000px] h-[600px] bg-white rounded-[30px] overflow-hidden shadow-2xl">

                {/* Partea Stângă */}
                <div className="hidden lg:flex w-[45%] relative p-8 flex-col justify-between items-start">

                    {/* Imaginea de fundal */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/img.png')" }}
                    />

                    {/* Overlay Gradient cu opacitate mare */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            background: `linear-gradient(180deg, ${colors.primaryDark} 100%, ${colors.primary} 0%)`,
                            opacity: 0.88
                        }}
                    />

                    {/* TEXTUL - Forțat cu stil inline pentru a GARANTA culoarea albă */}
                    <div className="absolute top-10 left-10 z-20">
                        <h1
                            style={{
                                color: "#ffffff",
                                fontSize: "24px",
                                fontWeight: "bold",
                                fontFamily: "'ADLaM Display', sans-serif",
                            }}
                        >
                            RetinaXAI
                        </h1>
                    </div>

                    {/* text centrat perfect */}
                    <div className="relative z-20 flex items-center justify-center w-full h-full px-10">

                        <div className="w-[520px] text-left">
                            <h2
                                style={{
                                    color: "#ffffff",
                                    fontSize: "29px",
                                    fontWeight: "600",
                                    lineHeight: "1.2",
                                    fontFamily: "Manrope",
                                }}
                            >
                                Advanced AI Diagnostic Support for Retinal Health.
                            </h2>
                        </div>

                    </div>
                </div>

                {/* Partea Dreaptă */}
                <div className="w-full flex flex-col justify-center p-12 bg-white">
                    <div className="w-full max-w-xs mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center lg:text-left" style={{
                            fontFamily: "'ADLaM Display', sans-serif",
                        }}>
                            Register to RetinaXAI
                        </h2>

                        <form className="space-y-4">
                            <div className="flex flex-col items-start">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                                <input type="email" placeholder="clinician@hospital.org" className="w-full p-3 bg-[#E5E7EB] rounded-xl outline-none text-sm" />
                            </div>

                            <div className="flex flex-col items-start">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Age</label>
                                <input type="number" placeholder="20" className="w-full p-3 bg-[#E5E7EB] rounded-xl outline-none text-sm" />
                            </div>

                            <div className="flex flex-col items-start">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Gender</label>
                                <input type="text" placeholder="F" className="w-full p-3 bg-[#E5E7EB] rounded-xl outline-none text-sm" />
                            </div>

                            <div className="flex flex-col items-start">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                                <div className="relative w-full">
                                    <input type={showPassword ? "text" : "password"} className="w-full p-3 bg-[#E5E7EB] rounded-xl outline-none text-sm pr-10" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <EyeIcon size={16} />
                                    </button>
                                </div>
                            </div>

                            <button
                                className="w-full text-white py-3 rounded-full mt-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                style={{
                                    background: `linear-gradient(90deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
                                    fontFamily: "Manrope",
                                    fontSize: "14px",
                                }}
                            >
                                Register<ArrowRightIcon size={16} />
                            </button>
                        </form>

                        <p className="mt-6 text-center text-xs text-gray-500">
                            Already have an account?{" "}
                            <span
                                className="text-[#0D47A1] font-bold cursor-pointer"
                                onClick={() => navigate('/login')}
                                >Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
const AboutRetinaXAI = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white font-['Inter',_sans-serif]">
            <nav className="flex justify-between items-center px-12 py-8">
                <div className="text-3xl font-extrabold tracking-tight text-[#003178]">
                    RetinaXAI
                </div>

                <div className="flex gap-10 items-center text-lg font-medium text-black">
                    <a href="/" className="hover:opacity-70 transition">
                        Home
                    </a>

                    <a
                        href="#"
                        className="underline underline-offset-8 decoration-2 text-[#003178]"
                    >
                        About
                    </a>

                    <a href="#" className="hover:opacity-70 transition" onClick={() => navigate('/login')}>
                        Login
                    </a>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-12 pt-16 pb-28 text-left">
                <section className="mb-20">
                    <div className="border-l-4 border-[#003178] pl-8">
                        <h1 className="text-5xl font-extrabold text-[#003178] mb-5">
                            About RetinaXAI
                        </h1>

                        <p className="text-xl text-[#003178] opacity-70 max-w-3xl leading-relaxed">
                            RetinaXAI is a bachelor’s thesis project focused on
                            transparent AI-powered diabetic retinopathy analysis
                            through medical image interpretation.
                        </p>
                    </div>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <div className="space-y-7 text-[#003178] text-lg leading-relaxed">
                        <p>
                            The platform was created to explore how artificial
                            intelligence can support medical specialists in the
                            early detection of diabetic retinopathy using retinal
                            fundus images.
                        </p>

                        <p>
                            Beyond prediction accuracy, RetinaXAI emphasizes
                            explainability by showing visual evidence behind each
                            decision, helping users better understand how the
                            model reached its conclusion.
                        </p>

                        <p>
                            The system combines a modern web interface, secure
                            backend services, and a dedicated AI engine for image
                            processing and Grad-CAM explainability generation.
                        </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-left">
                        <h3 className="text-sm uppercase tracking-widest font-bold text-[#003178] opacity-60 mb-6">
                            Technical Overview
                        </h3>

                        <div className="space-y-4 text-[#003178]">
                            <div className="border-b border-slate-200 pb-3">
                                <p className="font-semibold">Frontend</p>
                                <p className="text-sm opacity-70">
                                    React.js
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-3">
                                <p className="font-semibold">Backend</p>
                                <p className="text-sm opacity-70">
                                    Node.js / Express.js
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-3">
                                <p className="font-semibold">Database</p>
                                <p className="text-sm opacity-70">
                                    MongoDB
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">AI Engine</p>
                                <p className="text-sm opacity-70">
                                    Python / PyTorch / Grad-CAM
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-20 text-left">
                    <h2 className="text-2xl font-bold text-[#003178] mb-10">
                        Platform Roles
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="space-y-3">
                            <div className="w-8 h-1 bg-[#003178]"></div>
                            <h4 className="font-bold text-[#003178]">
                                Patients
                            </h4>
                            <p className="text-sm text-[#003178] opacity-70 leading-relaxed">
                                Upload retinal scans and review previous analyses
                                with clear visual explanations.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="w-8 h-1 bg-[#003178] opacity-60"></div>
                            <h4 className="font-bold text-[#003178]">
                                Doctors
                            </h4>
                            <p className="text-sm text-[#003178] opacity-70 leading-relaxed">
                                Validate AI-generated results and provide expert
                                medical observations.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="w-8 h-1 bg-[#003178] opacity-30"></div>
                            <h4 className="font-bold text-[#003178]">
                                Administrators
                            </h4>
                            <p className="text-sm text-[#003178] opacity-70 leading-relaxed">
                                Manage users, platform activity, and overall
                                system analytics.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="max-w-4xl text-left">
                    <p className="text-lg italic text-[#003178] leading-relaxed">
                        RetinaXAI reflects the growing importance of trustworthy
                        artificial intelligence in healthcare and demonstrates
                        how modern AI systems can become both powerful and
                        understandable.
                    </p>
                </section>
            </main>

            <footer className="border-t border-slate-100 py-10 px-12">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-x-10 gap-y-4 text-sm text-left">
                    <div className="flex items-center gap-3 text-[#003178]">
                        <img
                            src="/imgLoading.png"
                            alt="Logo"
                            className="w-6 h-6 object-contain"
                        />
                        <span className="font-bold">2026 RetinaXAI</span>
                    </div>

                    <span className="text-[#003178] opacity-60">
                        Pantea Tania Georgiana
                    </span>

                    <span className="text-[#003178] opacity-60">
                        Coordinator: Adrian Groza
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default AboutRetinaXAI;
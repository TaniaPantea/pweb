import React from 'react';
import { CloudArrowUpIcon, CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const AutomatedDiagnosticReport = () => {
    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
        tealGreen: "#003D36",
        subtleGray: "#434652"
    };
    const primaryBlue = "#003178";

    return (
        <div className="min-h-screen bg-gray-50 text-left" style={styles.inter}>

            {/* Header Nav */}
            {/* Navbar Corectat */}
            <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 w-full">
                <div className="flex items-center gap-12">
                    {/* Logo-ul care lipsea */}
                    <span className="text-2xl font-bold font-['Manrope']" style={{ color: primaryBlue }}>RetinaXAI</span>

                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                        <a href="#" className="hover:text-[#003178]">Dashboard</a>
                        <a href="#" className="hover:text-[#003178]">Upload</a>
                        {/* Schimbăm border-ul pe Results pentru că aici suntem acum */}
                        <a href="#" className="border-b-2 pb-1" style={{ color: primaryBlue, borderColor: primaryBlue }}>Results</a>
                        <a href="#" className="hover:text-[#003178]">Profile</a>
                    </div>
                </div>
                <QuestionMarkCircleIcon className="w-6 h-6 text-434652 cursor-pointer" />
            </nav>

            <div className="max-w-7xl p-10 mx-auto">

                {/* Top Header Section - Aliniat cu coloanele de mai jos */}
                <div className="grid grid-cols-12 gap-8 mb-12 items-end">
                    {/* Titlul ocupa aceeasi latime ca Visual Explanation (8 coloane) */}
                    <div className="col-span-8">
                        <h1 className="text-5xl" style={{ ...styles.adlam, color: styles.deepBlue }}>
                            Automated Diagnostic Report
                        </h1>
                    </div>

                    {/* Cardul de diagnostic ocupa aceeasi latime ca Fidelity Metrics (4 coloane) */}
                    <div className="col-span-4">
                        <div className="bg-white p-6 px-8 rounded-2xl shadow-sm flex items-center justify-between border border-gray-50">
                            <div className="text-left">
                                <p className="font-bold text-lg leading-tight" style={{ color: styles.deepBlue }}>
                                    Moderate Diabetic<br />Retinopathy
                                </p>
                            </div>
                            <div className="border-l border-gray-100 pl-6">
                                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-1">Confidence</p>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl font-bold" style={{ color: styles.tealGreen }}>87%</span>
                                    <div className="w-10 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full" style={{ width: '87%', backgroundColor: styles.tealGreen }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Main Visual Section (8 coloane) */}
                    <div className="col-span-8 space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
                            <h3 className="font-bold text-gray-800 text-lg mb-8 text-left">Visual Explanation</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative rounded-2xl overflow-hidden h-96 bg-black">
                                    <img src="/imgRetinaSec.png" alt="Original Scan" className="w-full h-full object-cover" />
                                    <div className="absolute top-5 left-5 bg-black/60 text-white text-[9px] px-3 py-1.5 rounded font-bold uppercase tracking-widest">
                                        Original Retinal Scan
                                    </div>
                                </div>
                                <div className="relative rounded-2xl overflow-hidden h-96 bg-black">
                                    <img src="/imgHeatmap.png" alt="Heatmap" className="w-full h-full object-cover" />
                                    <div className="absolute top-5 left-5 bg-black/60 text-white text-[9px] px-3 py-1.5 rounded font-bold uppercase tracking-widest">
                                        Grad-CAM Heatmap
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interpretation Card */}
                        <div className="p-10 rounded-3xl shadow-md text-left" style={{ backgroundColor: styles.deepBlue }}>
                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 text-blue-200/60">Clinical Interpretation</p>
                            <p className="text-base leading-relaxed text-white font-normal opacity-95">
                                The model focuses on regions with visible lesions, which are indicative of diabetic retinopathy.
                                Significant activation is observed in the temporal quadrant, aligning with microaneurysm
                                clusters identified in high-resolution fundus imaging.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Section (4 coloane) */}
                    <div className="col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-left">
                            <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-10">Fidelity Metrics</h3>

                            {[
                                { label: "Fidelity Score", desc: "Measures how well the explanation reflects model decisions.", val: "0.82", p: 82 },
                                { label: "Stability Score", desc: "Indicates consistency under small perturbations.", val: "0.76", p: 76 },
                                { label: "Human Agreement Score", desc: "Compares explanation with expert annotations.", val: "0.68", p: 68 }
                            ].map((m, i) => (
                                <div key={i} className="mb-10 last:mb-2">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="text-left">
                                            <p className="font-bold text-gray-900 text-sm mb-1">{m.label}</p>
                                            <p className="text-[11px] leading-snug" style={{ color: styles.subtleGray }}>{m.desc}</p>
                                        </div>
                                        <span className="font-bold text-lg pl-4" style={{ color: styles.deepBlue }}>{m.val}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                        <div className="h-full rounded-full" style={{ width: `${m.p}%`, backgroundColor: i === 2 ? '#93A8C7' : styles.deepBlue }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom AUC Stats */}
                        <div className="bg-gray-100/50 p-8 rounded-3xl border border-gray-100 text-left">
                            <h3 className="font-bold text-gray-400 text-[9px] uppercase tracking-[0.2em] mb-6">Explainability Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-2xl shadow-sm">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-2 whitespace-nowrap">Deletion AUC</p>
                                    <p className="text-2xl font-bold text-gray-900">0.81</p>
                                </div>
                                <div className="bg-white p-5 rounded-2xl shadow-sm">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-2 whitespace-nowrap">Insertion AUC</p>
                                    <p className="text-2xl font-bold text-gray-900">0.85</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomatedDiagnosticReport;
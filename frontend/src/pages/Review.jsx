import React from 'react';
import { QuestionMarkCircleIcon, EyeIcon, ClockIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

const PatientCaseReview = () => {
    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",      // Albastru general
        saveBlue: "#0D47A1",      // Culoarea pentru Save Annotation
        navReview: "#1D4ED8",     // Culoarea pentru Review în Navbar
        gradientStart: "#003178", // Start gradient Confirm
        gradientEnd: "#0D47A1",   // End gradient Confirm
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-left flex flex-col" style={styles.inter}>
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 w-full shrink-0">
                <div className="flex items-center gap-12">
                    <span className="text-2xl font-bold font-['Manrope']" style={{ color: styles.deepBlue }}>RetinaXAI</span>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                        <a href="#" className="hover:text-[#003178]">Dashboard</a>
                        <a href="#" className="hover:text-[#003178]">Upload</a>
                        <a href="#" className="hover:text-[#003178]">Results</a>
                        <a href="#" className="hover:text-[#003178]">Profile</a>
                        {/* Nav Review: 1D4ED8 */}
                        <a href="#" className="border-b-2 pb-1" style={{ color: styles.navReview, borderColor: styles.navReview }}>Review</a>
                    </div>
                </div>
                <QuestionMarkCircleIcon className="w-6 h-6 text-gray-400 cursor-pointer" />
            </nav>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Stânga */}
                <aside className="w-64 bg-[#F1F5F9] border-r border-gray-200 py-6">
                    <div className="px-4 space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm font-semibold border-r-4" style={{ color: styles.deepBlue, borderRightColor: styles.deepBlue }}>
                            <EyeIcon className="w-5 h-5" />
                            <span className="text-sm">Retinal Scans</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                            <ClockIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">History</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-10">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <h1 className="text-4xl" style={{ ...styles.adlam, color: styles.deepBlue }}>Patient Case Review</h1>

                        {/* Patient Info Bar */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Patient ID</p>
                                    <p className="font-semibold text-sm text-gray-800">#44920</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                                    <p className="font-semibold text-sm text-gray-800">Elena Rodriguez</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Age / Gender</p>
                                    <p className="font-semibold text-sm text-gray-800">54 / Female</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Analysis Date</p>
                                    <p className="font-semibold text-sm text-gray-800">Oct 24, 2023</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">AI Prediction</p>
                                    <span className="font-semibold text-red-600 text-sm">Moderate DR</span>
                                </div>
                                <div className="bg-blue-50 px-4 py-2 rounded-xl text-center">
                                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Confidence</p>
                                    <p className="text-xl font-bold" style={{ color: styles.deepBlue }}>87%</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Sections */}
                        <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-8 space-y-8">
                                {/* Container Imagine Principală - Se adaptează la dimensiunea imaginii */}
                                <div className="bg-black rounded-3xl overflow-hidden shadow-xl flex items-center justify-center p-2 min-h-[400px]">
                                    <img
                                        src="/imgOcular.png"
                                        alt="Scan Principal"
                                        className="max-w-full h-auto max-h-[70vh] object-contain"
                                    />
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">Expert Annotation</h3>
                                            <p className="text-xs text-gray-400 mt-1">Click and drag on image to start annotating</p>
                                        </div>
                                        {/* Save Ann Button: 0D47A1 */}
                                        <button
                                            className="text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md whitespace-nowrap transition-transform active:scale-95"
                                            style={{ backgroundColor: styles.saveBlue }}
                                        >
                                            Save Annotation
                                        </button>
                                    </div>
                                    {/* Container Imagine Expert Annotation */}
                                    <div className="bg-black rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 relative flex items-center justify-center p-2 min-h-[300px]">
                                        <img
                                            src="/imgOcular.png"
                                            alt="Annotation layer"
                                            className="max-w-full h-auto max-h-[60vh] object-contain opacity-80"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Metrics */}
                            <div className="col-span-4 space-y-8">
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-8">Explainability Metrics</h3>
                                    {[
                                        { label: "Fidelity", val: "0.94", p: 94 },
                                        { label: "Stability", val: "0.88", p: 88 },
                                        { label: "Human Agreement", val: "92%", p: 92 }
                                    ].map((m, i) => (
                                        <div key={i} className="mb-8 last:mb-0">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-sm font-bold text-gray-700">{m.label}</span>
                                                <span className="text-sm font-bold" style={{ color: styles.deepBlue }}>{m.val}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                                <div className="h-full rounded-full transition-all duration-700"
                                                     style={{ width: `${m.p}%`, backgroundColor: i === 2 ? '#10B981' : styles.deepBlue }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
                                    <div className="flex items-center gap-2 mb-6 text-gray-800">
                                        <ChatBubbleLeftEllipsisIcon className="w-5 h-5" style={{ color: styles.saveBlue }} />
                                        <h3 className="font-bold text-lg">Clinical Observations</h3>
                                    </div>
                                    <textarea
                                        className="w-full h-64 bg-gray-50 rounded-2xl p-4 text-sm text-gray-500 focus:outline-none border border-transparent focus:border-gray-200 resize-none"
                                        placeholder="Add clinical observations..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-white border-t border-gray-100 p-4 flex justify-end gap-4 px-12 shrink-0">
                <button className="px-8 py-3 bg-red-400 text-white rounded-xl font-bold text-sm hover:bg-red-500 transition-colors">
                    Discard Changes
                </button>
                {/* Confirm Diagnosis: Linear Gradient 003178 -> 0D47A1 */}
                <button
                    className="px-8 py-3 text-white rounded-xl font-bold text-sm shadow-md transition-all hover:brightness-110 active:scale-95"
                    style={{
                        background: `linear-gradient(to right, ${styles.gradientStart}, ${styles.gradientEnd})`
                    }}
                >
                    Confirm Diagnosis
                </button>
            </div>
        </div>
    );
};

export default PatientCaseReview;
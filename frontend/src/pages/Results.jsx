import {useEffect, useState} from 'react';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";

const AutomatedDiagnosticReport = ({ userRole = "doctor", isReviewed = false }) => {
    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
        tealGreen: "#003D36",
        subtleGray: "#434652"
    };
    const today = new Date().toLocaleDateString('en-GB');
    const primaryBlue = "#003178";
    const navigate = useNavigate();

    const [savedReview, setSavedReview] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('last_doctor_review');
        if (data) {
            setSavedReview(JSON.parse(data));
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-left pb-20" style={styles.inter}>
            <div className="max-w-7xl p-10 mx-auto">

                <div className="grid grid-cols-12 gap-8 mb-12 items-end">
                    <div className="col-span-8">
                        <h1 className="text-5xl" style={{ ...styles.adlam, color: styles.deepBlue }}>
                            Automated Diagnostic Report
                        </h1>
                    </div>

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

                        <div className="p-10 rounded-3xl shadow-md text-left" style={{ backgroundColor: styles.deepBlue }}>
                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 text-blue-200/60">Clinical Interpretation</p>
                            <p className="text-base leading-relaxed text-white font-normal opacity-95">
                                The model focuses on regions with visible lesions, which are indicative of diabetic retinopathy.
                                Significant activation is observed in the temporal quadrant, aligning with microaneurysm
                                clusters identified in high-resolution fundus imaging.
                            </p>
                        </div>
                    </div>

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
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.p}%`, backgroundColor: i === 2 ? '#93A8C7' : styles.deepBlue }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

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

                {userRole === 'doctor' && !isReviewed && (
                    <div className="mt-12 flex justify-end">
                        <button
                            onClick={() => navigate('/review')}
                            className="flex items-center gap-3 bg-[#0D47A1] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:bg-[#003178] transition-all transform hover:-translate-y-1 active:scale-95"
                        >
                            <span>Proceed to Expert Review</span>
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}

            </div>
            {savedReview && (
                <div className="bg-white p-8 rounded-3xl shadow-md border-2 border-blue-100 mt-10 text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-xl">Doctor's Clinical Validation</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Annotated Scan</p>
                            <div className="rounded-2xl overflow-hidden bg-black aspect-video border border-gray-100">
                                <img src={savedReview.annotatedImage} alt="Expert Annotation" className="w-full h-full object-contain" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Clinical Notes</p>
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-50 min-h-[150px]">
                                <p className="text-sm text-gray-700 leading-relaxed italic">
                                    "{savedReview.observations || "No specific observations provided."}"
                                </p>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                                <span>Date: {today}</span>
                                <span className="text-blue-600 tracking-tighter italic font-black">Electronic Signature: Dr. User</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default AutomatedDiagnosticReport;
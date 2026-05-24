import { useEffect, useState } from 'react';
import { CheckCircleIcon, ArrowRightIcon, CalendarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from "react-router-dom";

const AutomatedDiagnosticReport = ({ userRole = "doctor" }) => {
    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
        tealGreen: "#003D36",
        subtleGray: "#434652"
    };

    const navigate = useNavigate();
    const location = useLocation();

    const currentReport = location.state?.predictionData;

    const [selectedAnalysis, setSelectedAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentReport) {
            setSelectedAnalysis(currentReport);
            setLoading(false);
        } else {
            const fetchMostRecent = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/analysis/history');
                    if (!response.ok) throw new Error("Could not load backup log");
                    const data = await response.json();
                    if (data.length > 0) {
                        setSelectedAnalysis(data[0]);
                    }
                } catch (error) {
                    console.error("Error setting dynamic report contextual scope:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchMostRecent();
        }
    }, [currentReport]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg font-semibold" style={{ color: styles.deepBlue }}>Loading dynamic diagnostic report details...</p>
            </div>
        );
    }

    if (!selectedAnalysis) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center p-10">
                <p className="text-sm font-bold text-gray-400 italic">No historical target analytical scope found. Please upload an image or navigate via history logs.</p>
            </div>
        );
    }

    const label = selectedAnalysis?.predictionLabel || selectedAnalysis?.prediction_label || "Moderate Diabetic DR";
    const confidence = selectedAnalysis?.confidence || 0.87;
    const confidencePercent = Math.round(confidence * 100);

    // 1. Imaginea ORIGINALĂ - rămâne mereu curată, indiferent dacă raportul e adnotat sau nu
    // 1. Imaginea ORIGINALĂ - Rămâne mereu cea brută încărcată de pacient
    const originalSrc = selectedAnalysis?.originalImageBase64
        ? `data:image/png;base64,${selectedAnalysis.originalImageBase64}`
        : "/imgRetinaSec.png";

// 2. Imaginea HEATMAP - Modifică aici ca să citească EXCLUSIV din heatmapBase64
    const heatmapSrc = selectedAnalysis?.heatmapBase64 || selectedAnalysis?.heatmap_base64
        ? `data:image/png;base64,${selectedAnalysis.heatmapBase64 || selectedAnalysis.heatmap_base64}`
        : "/imgHeatmap.png";

// 3. Imaginea ADNOTATĂ de medic - Va fi afișată în panoul de validare de jos
    const annotatedSrc = selectedAnalysis?.annotatedImageBase64
        ? `data:image/jpeg;base64,${selectedAnalysis.annotatedImageBase64}`
        : originalSrc; // Fallback pe original dacă nu a fost adnotată încă

    const reportDate = selectedAnalysis?.createdAt
        ? new Date(selectedAnalysis.createdAt).toLocaleDateString('en-GB')
        : new Date().toLocaleDateString('en-GB');

    return (
        <div className="min-h-screen bg-gray-50 text-left pb-20" style={styles.inter}>
            <div className="max-w-7xl p-10 mx-auto">

                {/* Secțiunea de Header Curat */}
                <div className="grid grid-cols-12 gap-8 mb-12 items-end">
                    <div className="col-span-8 space-y-2">
                        <h1 className="text-5xl" style={{ ...styles.adlam, color: styles.deepBlue }}>
                            Automated Diagnostic Report
                        </h1>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            File Target Name: <span className="text-gray-600 font-bold normal-case font-mono">{selectedAnalysis.imageName}</span>
                        </p>
                    </div>

                    <div className="col-span-4">
                        <div className="bg-white p-6 px-8 rounded-2xl shadow-sm flex items-center justify-between border border-gray-50">
                            <div className="text-left">
                                <p className="font-bold text-lg leading-tight" style={{ color: styles.deepBlue }}>
                                    {label}
                                </p>
                                <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1 font-medium">
                                    <CalendarIcon className="w-3.5 h-3.5" /> Date: {reportDate}
                                </p>
                            </div>
                            <div className="border-l border-gray-100 pl-6">
                                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-1">Confidence</p>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl font-bold" style={{ color: styles.tealGreen }}>{confidencePercent}%</span>
                                    <div className="w-10 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full transition-all duration-500" style={{ width: `${confidencePercent}%`, backgroundColor: styles.tealGreen }}></div>
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
                                    {/* MODIFICAT: Aici se randează MEREU imaginea originală curată */}
                                    <img src={originalSrc} alt="Original Scan" className="w-full h-full object-cover" />
                                    <div className="absolute top-5 left-5 bg-black/60 text-white text-[9px] px-3 py-1.5 rounded font-bold uppercase tracking-widest">
                                        Original Retinal Scan
                                    </div>
                                </div>
                                <div className="relative rounded-2xl overflow-hidden h-96 bg-black">
                                    <img src={heatmapSrc} alt="Heatmap" className="w-full h-full object-cover" />
                                    <div className="absolute top-5 left-5 bg-black/60 text-white text-[9px] px-3 py-1.5 rounded font-bold uppercase tracking-widest">
                                        Grad-CAM Heatmap
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 rounded-3xl shadow-md text-left" style={{ backgroundColor: styles.deepBlue }}>
                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 text-blue-200/60">Clinical Interpretation</p>
                            <p className="text-base leading-relaxed text-white font-normal opacity-95">
                                The model focuses on regions with visible lesions, which are indicative of diabetic retinopathy. Activations generated by Grad-CAM point directly to sections associated with the diagnosed severity class: "{label}" inside the scan file target context. Significant activation is observed in the temporal quadrant, aligning with microaneurysm clusters identified in high-resolution fundus imaging.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-4 space-y-8">
                        {/* 1. SECȚIUNEA DE METRICI PRINCIPALE (Fidelity Score, Stability, Human Agreement) */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-left">
                            <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-10">Fidelity Metrics</h3>

                            {[
                                {
                                    label: "Fidelity Score",
                                    desc: "Measures how well the explanation reflects model decisions.",
                                    val: (selectedAnalysis?.fidelityScore ?? 0.82).toFixed(2),
                                    p: Math.round((selectedAnalysis?.fidelityScore ?? 0.82) * 100)
                                },
                                {
                                    label: "Stability Score",
                                    desc: "Indicates consistency under small perturbations.",
                                    val: (selectedAnalysis?.stabilityScore ?? 0.76).toFixed(2),
                                    p: Math.round((selectedAnalysis?.stabilityScore ?? 0.76) * 100)
                                },
                                {
                                    label: "Human Agreement Score",
                                    desc: "Compares explanation with expert annotations.",
                                    val: (selectedAnalysis?.humanAgreementScore ?? 0.68).toFixed(2),
                                    p: Math.round((selectedAnalysis?.humanAgreementScore ?? 0.68) * 100)
                                }
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

                        {/* 2. SECȚIUNEA DE GRILĂ DETALII (Deletion AUC / Insertion AUC) */}
                        <div className="bg-gray-100/50 p-8 rounded-3xl border border-gray-100 text-left">
                            <h3 className="font-bold text-gray-400 text-[9px] uppercase tracking-[0.2em] mb-6">Explainability Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-2xl shadow-sm">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-2 whitespace-nowrap">Deletion AUC</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {(selectedAnalysis?.deletionAuc ?? 0.81).toFixed(2)}
                                    </p>
                                </div>
                                <div className="bg-white p-5 rounded-2xl shadow-sm">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-2 whitespace-nowrap">Insertion AUC</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {(selectedAnalysis?.insertionAuc ?? 0.85).toFixed(2)}
                                    </p>
                                </div>
                            </div>
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

                {userRole === 'doctor' && (
                    <div className="mt-12 flex justify-end">
                        {!selectedAnalysis?.isReviewed ? (
                            <button
                                onClick={() => navigate('/review', { state: { currentAnalysis: selectedAnalysis } })}
                                className="flex items-center gap-3 bg-[#0D47A1] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:bg-[#003178] transition-all transform hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-wide"
                            >
                                <span>Proceed to Expert Review</span>
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 px-6 py-3.5 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-black uppercase tracking-wider rounded-xl shadow-sm">
                                <ShieldCheckIcon className="w-5 h-5 stroke-[2.5]" />
                                <span>Annotation completed & signed by doctor</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* AFIȘARE UNIVERSALĂ ADNOTĂRI MEDICl */}
            {selectedAnalysis?.isReviewed && (
                <div className="bg-white p-8 rounded-3xl shadow-md border-2 border-blue-100 mt-10 max-w-7xl mx-auto text-left mx-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
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
                                {/* MODIFICAT: Aici randerizăm exclusiv imaginea adnotată din canvas */}
                                <img src={annotatedSrc} alt="Expert Annotation Map" className="w-full h-full object-contain" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Clinical Notes</p>
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-50 min-h-[150px]">
                                <p className="text-sm text-gray-700 leading-relaxed italic font-medium">
                                    "{selectedAnalysis.doctorObservations || "No specific observations provided yet."}"
                                </p>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                <span>Validation Instance Log: Verified</span>
                                <span className="text-blue-600 font-black tracking-tighter italic">Electronic Signature Status: Signed Clinician</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AutomatedDiagnosticReport;
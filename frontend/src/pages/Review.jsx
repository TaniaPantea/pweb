import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ChatBubbleLeftEllipsisIcon,
    ArrowLeftIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const PatientCaseReview = ({ userRole }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const canvasRef = useRef(null);

    // Citim obiectul trimis la navigare din Results
    const activeAnalysis = location.state?.currentAnalysis || location.state?.predictionData;

    const [observation, setObservation] = useState(activeAnalysis?.doctorObservations || "");
    const [isDrawing, setIsDrawing] = useState(false);
    const [saving, setSaving] = useState(false);

    // Sursa imaginii este string-ul base64 al imaginii originale stocat în MongoDB
    const imageSrc = activeAnalysis?.originalImageBase64 || activeAnalysis?.originalBase64 || activeAnalysis?.original_base64
        ? `data:image/jpeg;base64,${activeAnalysis.originalImageBase64 || activeAnalysis.originalBase64 || activeAnalysis.original_base64}`
        : "/imgRetinaSec.png"; // fallback de siguranță

    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
        saveBlue: "#0D47A1",
        gradientStart: "#003178",
        gradientEnd: "#0D47A1",
    };

    // Securizare rută la nivel de interfață pentru medici și administratori
    useEffect(() => {
        if (userRole !== 'doctor' && userRole !== 'admin') {
            navigate('/dashboard');
        }
    }, [userRole, navigate]);

    // Inițializarea și desenarea imaginii brute pe Canvas
    useEffect(() => {
        if ((userRole !== 'doctor' && userRole !== 'admin') || !activeAnalysis) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Setări pentru pensula de adnotare (Galben strident pe fundalul brut al retinei)
            ctx.strokeStyle = "#FFFF00";
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        };
    }, [userRole, activeAnalysis, imageSrc]);

    // Calcularea coordonatelor Canvas corecte indiferent de rezoluție sau scalare CSS
    const getCanvasCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    const startDrawing = (e) => {
        const ctx = canvasRef.current.getContext('2d');
        const { x, y } = getCanvasCoordinates(e);

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const ctx = canvasRef.current.getContext('2d');
        const { x, y } = getCanvasCoordinates(e);

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.src = imageSrc;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "#FFFF00";
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        };
    };

    const handleConfirmDiagnosis = async () => {
        if (!activeAnalysis?._id) {
            alert("Nu s-a găsit nicio referință validă în baza de date pentru această analiză.");
            return;
        }

        const canvas = canvasRef.current;
        // Comprimăm la 0.7 JPEG pentru a preveni eroarea HTTP 413 Payload Too Large
        const annotatedImageData = canvas.toDataURL("image/jpeg", 0.7);

        setSaving(true);

        try {
            const response = await fetch(`http://localhost:5000/api/analysis/review/${activeAnalysis._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    observations: observation,
                    annotatedImage: annotatedImageData
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Eroare la salvarea fișierului pe server.");
            }

            alert("Diagnosis Confirmed and Annotated Image Saved!");

            // Redirecționare înapoi la Results cu starea proaspăt updatată
            navigate('/results', {
                state: {
                    predictionData: {
                        ...activeAnalysis,
                        isReviewed: true,
                        doctorObservations: observation,
                        annotatedImageBase64: annotatedImageData.replace(/^data:image\/jpeg;base64,/, "")
                    }
                }
            });
        } catch (error) {
            alert("Eroare comunicare server: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (userRole !== 'doctor' && userRole !== 'admin') {
        return null;
    }

    if (!activeAnalysis) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg font-semibold" style={{ color: styles.deepBlue }}>No clinical scan active. Please select a record from the dashboard.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-left flex flex-col" style={styles.inter}>
            {/* Zona Principală ocupă acum 100% din lățime datorită eliminării sidebar-ului */}
            <main className="flex-1 overflow-y-auto p-10">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-100"
                        >
                            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                        </button>

                        <h1
                            className="text-4xl"
                            style={{ ...styles.adlam, color: styles.deepBlue }}
                        >
                            Patient Case Review
                        </h1>
                    </div>

                    {/* Banner Date Reale */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 text-left">

                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target File Name</p>
                                <p className="font-semibold text-sm text-gray-800 truncate max-w-[180px]">{activeAnalysis.imageName}</p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Patient Age</p>
                                <p className="font-semibold text-sm text-gray-800">
                                    {activeAnalysis?.age ? `${activeAnalysis.age} ani` : "N/A"}
                                </p>
                            </div>

                            {/* AFIȘARE DINAMICĂ GEN */}
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Patient Gender</p>
                                <p className="font-semibold text-sm text-gray-800 capitalize">
                                    {activeAnalysis?.gender || "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status Code</p>
                                <p className="font-semibold text-sm text-gray-800">
                                    {activeAnalysis.isReviewed ? "✓ Reviewed" : " Pending Expert Review"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Analysis Date</p>
                                <p className="font-semibold text-sm text-gray-800">
                                    {new Date(activeAnalysis.createdAt || Date.now()).toLocaleDateString('en-GB')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                            <div className="text-left">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">AI Prediction</p>
                                <span className="font-semibold text-red-600 text-sm">{activeAnalysis.predictionLabel}</span>
                            </div>

                            <div className="bg-blue-50 px-4 py-2 rounded-xl text-center">
                                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Confidence</p>
                                <p className="text-xl font-bold" style={{ color: styles.deepBlue }}>
                                    {Math.round((activeAnalysis.confidence || 0) * 100)}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-8 space-y-8 text-left">
                            {/* Vizualizare Imagine Originală Principală */}
                            <div className="bg-black rounded-3xl overflow-hidden shadow-xl flex items-center justify-center p-2 min-h-[400px]">
                                <img
                                    src={imageSrc}
                                    alt="Original Patient Scan"
                                    className="max-w-full h-auto max-h-[70vh] object-contain"
                                />
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-left">
                                        <h3 className="font-semibold text-lg text-gray-800">Expert Annotation Canvas</h3>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Click and drag directly on the original fundus image to draw clinical indicators.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={resetCanvas}
                                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest"
                                    >
                                        <ArrowPathIcon className="w-4 h-4" />
                                        Reset Canvas
                                    </button>
                                </div>

                                <div className="bg-black rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 relative flex items-center justify-center p-2 min-h-[300px] cursor-crosshair">
                                    <canvas
                                        ref={canvasRef}
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={() => setIsDrawing(false)}
                                        onMouseLeave={() => setIsDrawing(false)}
                                        className="max-w-full h-auto max-h-[60vh] object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4 space-y-8 text-left">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-8">
                                    Explainability Metrics
                                    Custom</h3>

                                {[
                                    { label: "Fidelity", val: "0.94", p: 94 },
                                    { label: "Stability", val: "0.88", p: 88 },
                                    { label: "Human Agreement", val: "92%", p: 92 }
                                ].map((m, i) => (
                                    <div key={i} className="mb-8 last:mb-0">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-sm font-bold text-gray-700">{m.label}</span>
                                            <span className="text-sm font-bold" style={{ color: styles.deepBlue }}>
                                                {m.val}
                                            </span>
                                        </div>

                                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{
                                                    width: `${m.p}%`,
                                                    backgroundColor: i === 2 ? '#10B981' : styles.deepBlue
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
                                <div className="flex items-center gap-2 mb-6 text-gray-800">
                                    <ChatBubbleLeftEllipsisIcon
                                        className="w-5 h-5"
                                        style={{ color: styles.saveBlue }}
                                    />
                                    <h3 className="font-bold text-lg">Clinical Observations</h3>
                                </div>

                                <textarea
                                    className="w-full h-64 bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 focus:outline-none border border-transparent focus:border-gray-200 resize-none placeholder:text-gray-400 font-medium"
                                    placeholder="Type detailed validation reports or microaneurysm distribution here..."
                                    value={observation}
                                    onChange={(e) => setObservation(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-100 p-4 flex justify-end gap-4 px-12 shrink-0">
                <button
                    type="button"
                    onClick={resetCanvas}
                    disabled={saving}
                    className="px-8 py-3 bg-red-50 text-red-500 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                    Discard Changes
                </button>

                <button
                    type="button"
                    onClick={handleConfirmDiagnosis}
                    disabled={saving}
                    className="px-12 py-3 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                    style={{
                        background: `linear-gradient(to right, ${styles.gradientStart}, ${styles.gradientEnd})`
                    }}
                >
                    {saving ? "Saving Review..." : "Confirm Diagnosis"}
                </button>
            </footer>
        </div>
    );
};

export default PatientCaseReview;
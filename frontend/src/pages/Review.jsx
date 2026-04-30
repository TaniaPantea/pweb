import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    EyeIcon,
    ClockIcon,
    ChatBubbleLeftEllipsisIcon,
    ArrowLeftIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const PatientCaseReview = ({ userRole }) => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    const [observation, setObservation] = useState("");
    const [isDrawing, setIsDrawing] = useState(false);

    const imageSrc = "/imgOcular.png";

    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
        saveBlue: "#0D47A1",
        gradientStart: "#003178",
        gradientEnd: "#0D47A1",
    };

    useEffect(() => {
        if (userRole !== 'doctor') {
            navigate('/dashboard');
        }
    }, [userRole, navigate]);

    useEffect(() => {
        if (userRole !== 'doctor') return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.src = imageSrc;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "#FFFF00";
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        };
    }, [userRole]);

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
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x, y } = getCanvasCoordinates(e);

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x, y } = getCanvasCoordinates(e);

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
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

    const handleConfirmDiagnosis = () => {
        const canvas = canvasRef.current;
        const annotatedImageData = canvas.toDataURL("image/png");

        const reviewData = {
            patientId: "#44920",
            patientName: "Elena Rodriguez",
            ageGender: "54 / Female",
            analysisDate: "Oct 24, 2023",
            aiPrediction: "Moderate DR",
            confidence: "87%",
            observations: observation,
            annotatedImage: annotatedImageData,
            reviewDate: new Date().toLocaleDateString(),
            status: "Validated"
        };

        localStorage.setItem("last_doctor_review", JSON.stringify(reviewData));

        alert("Diagnosis Confirmed and Annotated Image Saved!");
        navigate('/results');
    };

    if (userRole !== 'doctor') {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-left flex flex-col" style={styles.inter}>
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-64 bg-[#F1F5F9] border-r border-gray-200 py-6 shrink-0">
                    <div className="px-4 space-y-2">
                        <div
                            className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm font-semibold border-r-4"
                            style={{ color: styles.deepBlue, borderRightColor: styles.deepBlue }}
                        >
                            <EyeIcon className="w-5 h-5" />
                            <span className="text-sm">Retinal Scans</span>
                        </div>

                        <div
                            onClick={() => navigate('/patientHistory')}
                            className="flex items-center gap-3 p-3 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                        >
                            <ClockIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">History</span>
                        </div>
                    </div>
                </aside>

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

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 text-left">
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

                        <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-12 lg:col-span-8 space-y-8 text-left">
                                <div className="bg-black rounded-3xl overflow-hidden shadow-xl flex items-center justify-center p-2 min-h-[400px]">
                                    <img
                                        src={imageSrc}
                                        alt="Scan Principal"
                                        className="max-w-full h-auto max-h-[70vh] object-contain"
                                    />
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="text-left">
                                            <h3 className="font-semibold text-lg text-gray-800">Expert Annotation</h3>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Click and drag on image to start annotating
                                            </p>
                                        </div>

                                        <button
                                            onClick={resetCanvas}
                                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest"
                                        >
                                            <ArrowPathIcon className="w-4 h-4" />
                                            Reset
                                        </button>
                                    </div>

                                    <div className="bg-black rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 relative flex items-center justify-center p-2 min-h-[300px] cursor-crosshair">
                                        <canvas
                                            ref={canvasRef}
                                            onMouseDown={startDrawing}
                                            onMouseMove={draw}
                                            onMouseUp={stopDrawing}
                                            onMouseLeave={stopDrawing}
                                            className="max-w-full h-auto max-h-[60vh] object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-4 space-y-8 text-left">
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-8">
                                        Explainability Metrics
                                    </h3>

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
                                        className="w-full h-64 bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 focus:outline-none border border-transparent focus:border-gray-200 resize-none placeholder:text-gray-400"
                                        placeholder="Type detailed medical findings here..."
                                        value={observation}
                                        onChange={(e) => setObservation(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="bg-white border-t border-gray-100 p-4 flex justify-end gap-4 px-12 shrink-0">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-3 bg-red-50 text-red-500 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
                >
                    Discard Changes
                </button>

                <button
                    onClick={handleConfirmDiagnosis}
                    className="px-12 py-3 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 transition-all hover:brightness-110 active:scale-95"
                    style={{
                        background: `linear-gradient(to right, ${styles.gradientStart}, ${styles.gradientEnd})`
                    }}
                >
                    Confirm Diagnosis
                </button>
            </footer>
        </div>
    );
};

export default PatientCaseReview;
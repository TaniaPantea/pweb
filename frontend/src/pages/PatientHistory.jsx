import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    EyeIcon,
    ClockIcon,
    ArrowLeftIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const PatientHistory = ({ userRole }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
    };

    const [timelineData, setTimelineData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Identificăm dacă cel care privește pagina este cadru medical sau administrator
    const isClinicalStaff = userRole === 'doctor' || userRole === 'admin';

    // DETERMINARE NUME CONTEXTUAL PENTRU FILTRARE:
    // Dacă e medic -> preia numele trimis din Dashboard (targetPatientName)
    // Dacă e pacient -> își preia propriul nume salvat în localStorage la login
    const getTargetName = () => {
        if (isClinicalStaff) {
            return location.state?.targetPatientName;
        } else {
            const loggedInUser = JSON.parse(localStorage.getItem('user_data')) || {};
            return loggedInUser.name;
        }
    };

    const targetPatient = getTargetName();

    // Încărcarea datelor dinamice la montarea componentei
    useEffect(() => {
        const fetchHistoryLogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/analysis/history');
                if (!response.ok) throw new Error("Failed to fetch historical database metrics.");
                const data = await response.json();
                setTimelineData(data);
            } catch (error) {
                console.error("Error pulling history timeline from Node.js:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryLogs();
    }, [userRole, navigate]);

    // Filtrarea istoricului în timp real
    const filteredTimeline = timelineData.filter(item => {
        // 1. FILTRARE CONTEXTUALĂ STRICTĂ (Izolarea datelor):
        // Dacă avem un targetPatient stabilit (fie selectat de medic, fie pacientul logat),
        // ascundem toate înregistrările care nu îi aparțin.
        if (targetPatient && item.patientName !== targetPatient) {
            return false;
        }

        // Dacă ești pacient simplu și dintr-un motiv anume analiza din DB nu are câmpul patientName salvat,
        // o ascundem preventiv ca să nu vezi testele altora
        if (!isClinicalStaff && !item.patientName) {
            return false;
        }

        // 2. Filtrele existente de dată calendaristică
        if (!item.createdAt) return true;
        const itemDate = new Date(item.createdAt);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start) start.setHours(0, 0, 0, 0);
        if (end) end.setHours(23, 59, 59, 999);

        const matchesStart = start ? itemDate >= start : true;
        const matchesEnd = end ? itemDate <= end : true;

        return matchesStart && matchesEnd;
    });

    const getResultColorClass = (label) => {
        if (label === "No DR" || label === "Normal") return "text-green-600";
        if (label === "Mild") return "text-blue-600";
        if (label === "Moderate") return "text-amber-500";
        return "text-red-600";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <p className="text-sm font-bold" style={{ color: styles.deepBlue }}>Loading patient clinical chronicle...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-left flex flex-col" style={styles.inter}>
            <div className="flex flex-1">

                {/* Zona Principală de Conținut */}
                <main className="flex-1 p-10 overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition shadow-sm"
                                >
                                    <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                                </button>
                                <div>
                                    <h1 className="text-3xl" style={{ ...styles.adlam, color: styles.deepBlue }}>
                                        {isClinicalStaff ? "Global Archive Logs" : "My Analysis History"}
                                    </h1>
                                    <p className="text-gray-400 text-sm font-medium">
                                        {isClinicalStaff && targetPatient ? `Viewing records for: ${targetPatient}` : "Chronological Retinal Diagnostics"}
                                    </p>
                                </div>
                            </div>

                            {/* Filtrele de Dată Calendaristică */}
                            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">From</span>
                                    <input
                                        type="date"
                                        className="px-3 py-2 bg-gray-50 rounded-xl text-xs border border-gray-100 outline-none focus:ring-2 focus:ring-blue-100"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">To</span>
                                    <input
                                        type="date"
                                        className="px-3 py-2 bg-gray-50 rounded-xl text-xs border border-gray-100 outline-none focus:ring-2 focus:ring-blue-100"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                {(startDate || endDate) && (
                                    <button
                                        onClick={() => { setStartDate(""); setEndDate(""); }}
                                        className="mt-5 p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Listarea Cronologică */}
                        <div className="space-y-4">
                            {filteredTimeline.length > 0 ? (
                                filteredTimeline.map((item) => (
                                    <div
                                        key={item._id}
                                        onClick={() => navigate('/results', { state: { predictionData: item } })}
                                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left cursor-pointer group"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div>
                                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                                                    {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                                </p>
                                                <h3 className={`text-xl font-bold mt-1 group-hover:text-blue-900 transition-colors ${getResultColorClass(item.predictionLabel)}`}>
                                                    {item.predictionLabel}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Confidence: <span className="font-semibold text-gray-700">{Math.round((item.confidence || 0) * 100)}%</span>
                                                </p>
                                                <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-md">
                                                    Source File: {item.imageName}
                                                </p>
                                                {isClinicalStaff && (
                                                    <p className="text-[11px] text-blue-600 font-bold mt-1">
                                                        Patient: {item.patientName || "Anonymous"}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="text-sm md:text-right">
                                                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Clinical Review Status</p>
                                                {item.isReviewed ? (
                                                    <span className="inline-block mt-1 px-3 py-1 bg-green-50 text-green-700 border border-green-200 font-bold text-[10px] uppercase rounded-full">
                                                        Annotated
                                                    </span>
                                                ) : (
                                                    <span className="inline-block mt-1 px-3 py-1 bg-red-50 text-red-700 border border-red-200 font-bold text-[10px] uppercase rounded-full">
                                                        Not annotated
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                                            <div className="md:col-span-2">
                                                <div className="h-20 w-20 bg-black rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                                    <img
                                                        src={`data:image/png;base64,${item.originalImageBase64}`}
                                                        alt="Retinal Overlay Map"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-10 bg-gray-50 rounded-xl p-4 border border-gray-100 min-h-[80px] flex items-center">
                                                <p className="text-sm text-gray-600 leading-relaxed italic">
                                                    {item.doctorObservations || "No clinical validation notes documented for this scan record yet."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400 italic">
                                    No records found for your clinical archive scope.
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientHistory;
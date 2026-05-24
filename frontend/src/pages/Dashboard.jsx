import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    EllipsisVerticalIcon,
    MagnifyingGlassIcon,
    ClockIcon,
    CheckBadgeIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const navigate = useNavigate();

    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
        tealGreen: "#1D3E39",
        subtleGray: "#6B7280"
    };

    const [recentHistory, setRecentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [historySearch, setHistorySearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [stats, setStats] = useState({
        totalImages: 0,
        avgFidelity: 0.82,
        avgStability: 0.76
    });

    const [drDistribution, setDrDistribution] = useState([
        { label: "NORMAL", color: "#1D3E39", count: 0, height: 20 },
        { label: "MILD", color: "#253D88", count: 0, height: 20 },
        { label: "MODERATE", color: "#4759B3", count: 0, height: 20 },
        { label: "SEVERE", color: "#B33E2D", count: 0, height: 20 },
        { label: "PROLIF.", color: "#5E626D", count: 0, height: 20 },
    ]);

    const [confidenceDistribution, setConfidenceDistribution] = useState({
        high: 0,
        moderate: 0,
        low: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/analysis/history');
                if (!response.ok) throw new Error("Could not load history data.");
                const data = await response.json();

                setRecentHistory(data);
                calculateMetrics(data);
            } catch (error) {
                console.error("Error connecting to backend history API:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const calculateMetrics = (dataList) => {
        const total = dataList.length;
        if (total === 0) return;

        let severityCounts = { "No DR": 0, "Mild": 0, "Moderate": 0, "Severe": 0, "Proliferative DR": 0 };
        let confCounts = { high: 0, moderate: 0, low: 0 };

        dataList.forEach(item => {
            const label = item.predictionLabel || "No DR";
            if (severityCounts[label] !== undefined) {
                severityCounts[label]++;
            }

            const conf = item.confidence || 0;
            if (conf >= 0.85) confCounts.high++;
            else if (conf >= 0.50) confCounts.moderate++;
            else confCounts.low++;
        });

        const maxCount = Math.max(...Object.values(severityCounts), 1);
        const updatedDistribution = [
            { label: "NORMAL", color: "#1D3E39", count: severityCounts["No DR"], height: Math.max((severityCounts["No DR"] / maxCount) * 240, 20) },
            { label: "MILD", color: "#253D88", count: severityCounts["Mild"], height: Math.max((severityCounts["Mild"] / maxCount) * 240, 20) },
            { label: "MODERATE", color: "#4759B3", count: severityCounts["Moderate"], height: Math.max((severityCounts["Moderate"] / maxCount) * 240, 20) },
            { label: "SEVERE", color: "#B33E2D", count: severityCounts["Severe"], height: Math.max((severityCounts["Severe"] / maxCount) * 240, 20) },
            { label: "PROLIF.", color: "#5E626D", count: severityCounts["Proliferative DR"], height: Math.max((severityCounts["Proliferative DR"] / maxCount) * 240, 20) },
        ];

        const highPct = Math.round((confCounts.high / total) * 100) || 0;
        const modPct = Math.round((confCounts.moderate / total) * 100) || 0;
        const lowPct = 100 - highPct - modPct;

        setStats(prev => ({ ...prev, totalImages: total }));
        setDrDistribution(updatedDistribution);
        setConfidenceDistribution({ high: highPct, moderate: modPct, low: lowPct });
    };

    const getBadgeStyle = (label) => {
        if (label === "No DR" || label === "Normal") return "bg-green-50 text-green-700 border-green-100";
        if (label === "Mild") return "bg-blue-50 text-blue-700 border-blue-100";
        if (label === "Moderate") return "bg-amber-50 text-amber-700 border-amber-100";
        return "bg-red-50 text-red-700 border-red-100";
    };

    const filteredHistory = recentHistory.filter(row => {
        // Permite căutarea direct din input și după numele pacientului sau fișier
        const currentPatientName = row.patientName || "Anonymous Patient";
        const matchesSearch = row.imageName.toLowerCase().includes(historySearch.toLowerCase()) ||
            currentPatientName.toLowerCase().includes(historySearch.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ? true :
                statusFilter === "reviewed" ? row.isReviewed === true :
                    row.isReviewed === false;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg font-semibold" style={{ color: styles.deepBlue }}>Loading statistical system dashboards...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-left pb-20" style={styles.inter}>
            <div className="max-w-7xl px-10 mx-auto pt-10">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2" style={{color: styles.deepBlue, fontFamily: "'ADLaM Display', sans-serif"}}>Dashboard</h1>
                    <p className="text-gray-500 max-w-lg">
                        Visualizing retinal diagnostic performance and system health metrics.
                    </p>
                </div>

                {/* Secțiunea de Metrici */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {[
                        { label: "Total images analyzed", value: stats.totalImages.toLocaleString() },
                        { label: "Average fidelity", value: stats.avgFidelity },
                        { label: "Average stability", value: stats.avgStability }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                            <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-6 mb-8">
                    <div className="col-span-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                        <div className="flex justify-between items-center mb-12">
                            <h3 className="font-bold text-gray-800 text-lg">DR severity distribution</h3>
                            <div className="flex gap-4">
                                {drDistribution.map((d, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                                        <span className="text-[9px] font-bold text-gray-400 uppercase">{d.label} ({d.count})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-72 flex items-end justify-between px-6">
                            {drDistribution.map((bar, i) => (
                                <div key={i} className="flex flex-col items-center w-full">
                                    <div className="w-12 rounded-t-sm transition-all duration-700 ease-out" style={{ height: bar.height, backgroundColor: bar.color }}></div>
                                    <div className="w-14 h-[1px] bg-gray-100"></div>
                                    <span className="text-[10px] font-bold text-gray-400 mt-6 tracking-tighter">{bar.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-between">
                        <h3 className="font-bold text-gray-800 text-lg">Predictions distribution</h3>
                        <div className="relative flex justify-center items-center py-4">
                            <svg className="w-44 h-44 transform -rotate-90">
                                <circle cx="88" cy="88" r="75" stroke="#F3F4F6" strokeWidth="18" fill="transparent" />
                                <circle cx="88" cy="88" r="75" stroke="#253D88" strokeWidth="18" fill="transparent" strokeDasharray="471" strokeDashoffset={471 * (1 - (confidenceDistribution.high + confidenceDistribution.moderate) / 100)} />
                                <circle cx="88" cy="88" r="75" stroke="#1D3E39" strokeWidth="18" fill="transparent" strokeDasharray="471" strokeDashoffset={471 * (1 - confidenceDistribution.high / 100)} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-800">{confidenceDistribution.high}%</span>
                            </div>
                        </div>
                        <div className="space-y-3 text-left">
                            <div className="flex justify-between text-[11px] font-bold">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1D3E39]"></div> <span className="text-gray-600">High Confidence (≥85%)</span></div>
                                <span>{confidenceDistribution.high}%</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#253D88]"></div> <span className="text-gray-600">Moderate Confidence</span></div>
                                <span>{confidenceDistribution.moderate}%</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-200"></div> <span className="text-gray-400">Low/Manual Review</span></div>
                                <span>{confidenceDistribution.low}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden mb-8">
                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-800 text-lg">Recent Analysis History</h3>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-none">
                                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search name or file..."
                                    className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-100 rounded-lg text-xs w-full md:w-48 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    onChange={(e) => setHistorySearch(e.target.value)}
                                />
                            </div>

                            <div className="relative flex-1 md:flex-none">
                                <FunnelIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs w-full md:w-40 focus:ring-1 focus:ring-blue-500 focus:outline-none appearance-none font-medium text-gray-600"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="pending">Pending Review</option>
                                    <option value="reviewed">Reviewed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <table className="w-full text-sm table-fixed">
                        <thead className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left w-[10%]">Scan Preview</th>
                            <th className="px-6 py-4 text-left w-[18%]">Patient Name</th>
                            <th className="px-6 py-4 text-left w-[20%]">File Target Name</th>
                            <th className="px-6 py-4 text-left w-[18%]">AI Diagnostic</th>
                            <th className="px-6 py-4 text-left w-[11%]">Clinic Status</th>
                            <th className="px-6 py-4 text-left w-[11%]">Analysis Date</th>
                            <th className="px-6 py-4 text-right w-[12%]">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-left">
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((row) => (
                                <tr key={row._id} className="group transition-colors hover:bg-gray-50/60">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 bg-black rounded-lg overflow-hidden border border-gray-100">
                                            <img
                                                src={`data:image/png;base64,${row.originalImageBase64}`}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    {/* AFIȘARE NUME PACIENT REALE */}
                                    <td className="px-6 py-4 font-bold text-gray-700 truncate">
                                        {row.patientName || "Anonymous Patient"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-medium tracking-tight truncate">{row.imageName}</td>
                                    <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getBadgeStyle(row.predictionLabel)}`}>
                                                {row.predictionLabel} ({Math.round((row.confidence || 0) * 100)}%)
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.isReviewed ? (
                                            <span className="text-teal-600 font-bold text-[10px] uppercase tracking-tight">Annotated</span>
                                        ) : (
                                            <span className="text-amber-500 font-bold text-[10px] uppercase tracking-tight">Pending</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs font-medium">
                                        {new Date(row.createdAt).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center h-8">
                                            <div className="hidden group-hover:flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2">
                                                <button
                                                    onClick={() => navigate('/results', { state: { predictionData: row } })}
                                                    className="text-[9px] font-black text-blue-600 px-2 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors uppercase"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => navigate('/patientHistory', { state: { targetPatientName: row.patientName || "Anonymous Patient" } })}
                                                    className="text-[9px] font-black text-gray-600 px-2 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors uppercase"
                                                >
                                                    History
                                                </button>
                                            </div>
                                            <div className="group-hover:hidden">
                                                <EllipsisVerticalIcon className="w-5 h-5 text-gray-300" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-gray-400 text-xs italic tracking-wide">
                                    No analysis records found in MongoDB matching your criteria.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
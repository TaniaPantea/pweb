import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    QuestionMarkCircleIcon,
    EllipsisVerticalIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    XMarkIcon,
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

    const [recentHistory, setRecentHistory] = useState([
        { id: 1, patient: "Pantea Tania", result: "Normal (99.2%)", date: "Oct 24, 2023 • 14:22", badgeColor: "bg-green-50 text-green-700 border-green-100", status: true },
        { id: 2, patient: "Turcu Flavius", result: "Moderate DR (84.1%)", date: "Oct 24, 2023 • 12:05", badgeColor: "bg-red-50 text-red-700 border-red-100", status: false },
        { id: 3, patient: "Moga Antonia", result: "Mild DR (92.5%)", date: "Oct 23, 2023 • 16:50", badgeColor: "bg-blue-50 text-blue-700 border-blue-100", status: false },
    ]);

    const [historySearch, setHistorySearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // "all", "pending", "reviewed"

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const drDistribution = [
        { label: "NORMAL", color: "#1D3E39", height: 245 },
        { label: "MILD", color: "#253D88", height: 160 },
        { label: "MODERATE", color: "#4759B3", height: 190 },
        { label: "SEVERE", color: "#B33E2D", height: 75 },
        { label: "PROLIF.", color: "#5E626D", height: 45 },
    ];

    const handleEditClick = (record) => {
        setSelectedRecord({ ...record });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        setRecentHistory(recentHistory.map(item =>
            item.id === selectedRecord.id ? selectedRecord : item
        ));
        setIsEditModalOpen(false);
    };

    const filteredHistory = recentHistory.filter(row => {
        const matchesName = row.patient.toLowerCase().includes(historySearch.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ? true :
                statusFilter === "reviewed" ? row.status === true :
                    row.status === false;

        return matchesName && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50 text-left pb-20" style={styles.inter}>
            <div className="max-w-7xl px-10 mx-auto pt-10">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2" style={{color: styles.deepBlue, fontFamily: "'ADLaM Display', sans-serif"}}>Dashboard</h1>
                    <p className="text-gray-500 max-w-lg">
                        Visualizing retinal diagnostic performance and system health metrics.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                    {[
                        { label: "Total images analyzed", value: "12,482" },
                        { label: "Average fidelity", value: "0.89" },
                        { label: "Average stability", value: "0.89" }
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
                                        <span className="text-[9px] font-bold text-gray-400 uppercase">{d.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-72 flex items-end justify-between px-6">
                            {drDistribution.map((bar, i) => (
                                <div key={i} className="flex flex-col items-center w-full">
                                    <div className="w-12 rounded-t-sm" style={{ height: bar.height, backgroundColor: bar.color }}></div>
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
                                <circle cx="88" cy="88" r="75" stroke="#253D88" strokeWidth="18" fill="transparent" strokeDasharray="471" strokeDashoffset={471 * (1 - 0.92)} />
                                <circle cx="88" cy="88" r="75" stroke="#1D3E39" strokeWidth="18" fill="transparent" strokeDasharray="471" strokeDashoffset={471 * (1 - 0.78)} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-800">92%</span>
                            </div>
                        </div>
                        <div className="space-y-3 text-left">
                            <div className="flex justify-between text-[11px] font-bold">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1D3E39]"></div> <span className="text-gray-600">High Confidence</span></div>
                                <span>78%</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#253D88]"></div> <span className="text-gray-600">Moderate</span></div>
                                <span>14%</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-200"></div> <span className="text-gray-400">Low/Manual Review</span></div>
                                <span>8%</span>
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
                                    placeholder="Search patient..."
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
                            <th className="px-6 py-4 text-left w-[8%]">Image</th>
                            <th className="px-6 py-4 text-left w-[25%]">Patient</th>
                            <th className="px-6 py-4 text-left w-[20%]">Diagnostic</th>
                            <th className="px-6 py-4 text-left w-[15%]">Status</th>
                            <th className="px-6 py-4 text-left w-[22%]">Date</th>
                            <th className="px-6 py-4 text-right w-[10%]">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-left">
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((row) => (
                                <tr key={row.id} className="group transition-colors hover:bg-gray-50/60">
                                    <td className="px-6 py-4">
                                        <div className="w-10 h-10 bg-black rounded-lg"></div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-800 tracking-tight">{row.patient}</td>
                                    <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${row.badgeColor}`}>
                                                {row.result}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.status ? (
                                            <div className="flex items-center gap-1.5 text-teal-600 font-bold text-[10px] uppercase">
                                                <CheckBadgeIcon className="w-4 h-4" /> Reviewed
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-[10px] uppercase">
                                                <ClockIcon className="w-4 h-4" /> Pending
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs font-medium">
                                        {row.date}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center h-8">
                                            <div className="hidden group-hover:flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                                                <button
                                                    onClick={() => navigate('/results')}
                                                    className="text-[10px] font-black text-blue-600 px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                                >
                                                    VIEW
                                                </button>
                                                <button
                                                    onClick={() => handleEditClick(row)}
                                                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                                                >
                                                    <PencilSquareIcon className="w-4 h-4" />
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
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-400 text-xs italic tracking-wide">
                                    No analysis records match your search criteria.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl animate-in zoom-in duration-200 text-left">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold" style={{ color: styles.deepBlue }}>Update Record</h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                    <XMarkIcon className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Patient Name</label>
                                    <input
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 focus:outline-none font-medium text-sm"
                                        value={selectedRecord?.patient || ""}
                                        onChange={(e) => setSelectedRecord({...selectedRecord, patient: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Medical Review Status</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedRecord({...selectedRecord, status: false})}
                                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase border transition-all ${!selectedRecord?.status ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-gray-100 text-gray-400'}`}
                                        >
                                            Pending
                                        </button>
                                        <button
                                            onClick={() => setSelectedRecord({...selectedRecord, status: true})}
                                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase border transition-all ${selectedRecord?.status ? 'bg-teal-50 border-teal-200 text-teal-600' : 'bg-white border-gray-100 text-gray-400'}`}
                                        >
                                            Reviewed
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-50">
                                    <button onClick={() => setIsEditModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-widest transition-colors hover:bg-gray-100">Cancel</button>
                                    <button
                                        onClick={handleSaveEdit}
                                        className="flex-1 px-4 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:brightness-110 transition-all"
                                        style={{ backgroundColor: styles.deepBlue }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
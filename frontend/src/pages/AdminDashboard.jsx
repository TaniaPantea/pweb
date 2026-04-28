import React, { useState } from 'react';
import {
    QuestionMarkCircleIcon,
    EllipsisVerticalIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    TrashIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
        darkTeal: "#1D3E39",
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [historySearch, setHistorySearch] = useState("");

    const allUsers = [
        { name: "Dr. David", role: "Ophthalmologist", lastActive: "2 hours ago" },
        { name: "Elena Lopez", role: "User", lastActive: "5 mins ago" },
        { name: "Marcus King", role: "User", lastActive: "Yesterday" },
    ];

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (roleFilter === "All" || user.role === roleFilter)
    );

    const historyData = [
        { patient: "Pantea Tania", result: "Normal (99.2%)", date: "Oct 24, 2023 • 14:22", status: "bg-green-50 text-green-700 border-green-100" },
        { patient: "Turcu Flavius", result: "Moderate DR (84.1%)", date: "Oct 24, 2023 • 12:05", status: "bg-red-50 text-red-700 border-red-100" },
        { patient: "Moga Antonia", result: "Mild DR (92.5%)", date: "Oct 23, 2023 • 16:50", status: "bg-blue-50 text-blue-700 border-blue-100" },
    ];

    const filteredHistory = historyData.filter(row =>
        row.patient.toLowerCase().includes(historySearch.toLowerCase()) ||
        row.result.toLowerCase().includes(historySearch.toLowerCase()) ||
        row.date.toLowerCase().includes(historySearch.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20 text-left" style={styles.inter}>
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 mb-8">
                <div className="flex items-center gap-12">
                    <span className="text-2xl font-bold font-['Manrope']" style={{ color: styles.deepBlue }}>RetinaXAI</span>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                        <a href="#" className="border-b-2 pb-1" style={{ color: styles.deepBlue, borderColor: styles.deepBlue }}>Dashboard</a>
                        <a href="#" className="hover:text-[#003178]">Upload</a>
                        <a href="#" className="hover:text-[#003178]">Results</a>
                        <a href="#" className="hover:text-[#003178]">Profile</a>
                    </div>
                </div>
                <QuestionMarkCircleIcon className="w-6 h-6 text-gray-400 cursor-pointer" />
            </nav>

            <div className="max-w-7xl px-10 mx-auto">
                <h1 className="text-5xl mb-10" style={{ ...styles.adlam, color: styles.deepBlue }}>Admin Dashboard</h1>

                {/* Top Stats */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    {[{ l: "TOTAL USERS", v: "1,284" }, { l: "TOTAL ANALYSES", v: "42,902" }, { l: "AVG FIDELITY", v: "0.89" }, { l: "AVG STABILITY", v: "0.89" }].map((s, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                            <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">{s.l}</p>
                            <p className="text-4xl font-bold text-gray-800">{s.v}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-6 mb-8">
                    {/* Analyses Over Time */}
                    <div className="col-span-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                        <h3 className="font-bold text-gray-800 mb-10">Analyses Over Time</h3>
                        <div className="relative h-64 w-full">
                            <svg viewBox="0 0 800 200" className="w-full h-48 overflow-visible">
                                <path d="M0,150 C50,150 80,165 120,165 C180,165 220,90 280,90 C340,90 380,170 450,170 C520,170 560,50 630,50 C700,50 750,130 800,90" fill="none" stroke={styles.deepBlue} strokeWidth="3" />
                                <circle cx="280" cy="90" r="4" fill={styles.deepBlue} />
                                <circle cx="630" cy="50" r="4" fill={styles.deepBlue} />
                            </svg>
                            {/* Spațiere corectată pentru etichete */}
                            <div className="flex justify-between mt-10 border-t border-gray-100 pt-4 text-[10px] font-bold text-gray-400 uppercase">
                                <span>Day 1</span><span>Day 5</span><span>Day 10</span><span>Day 15</span><span>Day 20</span><span>Day 25</span><span>Day 30</span>
                            </div>
                        </div>
                    </div>

                    {/* Prediction Distribution */}
                    <div className="col-span-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                        <h3 className="font-bold text-gray-800 mb-8">Prediction Distribution</h3>
                        <div className="space-y-6">
                            {[{ l: "No DR", v: "64%", c: styles.darkTeal }, { l: "Mild", v: "18%", c: "#253D88" }, { l: "Moderate", v: "10%", c: "#4759B3" }, { l: "Severe", v: "8%", c: "#B33E2D" }].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-gray-500">{item.l}</span>
                                        <span>{item.v}</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full" style={{ width: item.v, backgroundColor: item.c }}></div></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 mb-8 text-left">
                    {/* Explainability */}
                    <div className="col-span-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                        <h3 className="font-bold text-gray-800 mb-8">Explainability Metrics</h3>
                        <div className="relative flex justify-center items-center h-48">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="#003178" strokeWidth="8" fill="transparent" strokeDasharray="440" strokeDashoffset="35" />
                                <circle cx="80" cy="80" r="55" stroke="#1D3E39" strokeWidth="8" fill="transparent" strokeDasharray="345" strokeDashoffset="51" />
                            </svg>
                            <span className="absolute text-2xl font-bold text-gray-800">88%</span>
                        </div>
                    </div>

                    {/* User Management - Filtre si Actiuni Corectate */}
                    <div className="col-span-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                        <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:justify-between lg:items-center">
                            <h3 className="font-bold text-gray-800">User Management</h3>
                            <div className="flex items-center gap-3">
                                <div className="relative flex items-center">
                                    <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 text-gray-400 z-10" />
                                    <input
                                        type="text"
                                        placeholder="Search by name..."
                                        className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs w-40 focus:outline-none"
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="text-xs bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 w-36 focus:outline-none"
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                >
                                    <option value="All">All Roles</option>
                                    <option value="Ophthalmologist">Ophthalmologists</option>
                                    <option value="User">Users</option>
                                </select>
                                <button className="text-[10px] font-bold text-blue-700 whitespace-nowrap">
                                    VIEW ALL →
                                </button>
                            </div>
                        </div>
                        <table className="w-full text-sm">
                            <thead className="text-[10px] uppercase font-black text-gray-400 border-b border-gray-50">
                            <tr>
                                <th className="py-4 text-left tracking-widest">Name</th>
                                <th className="py-4 text-left tracking-widest">Role</th>
                                <th className="py-4 text-right tracking-widest">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredUsers.map((user, i) => (
                                <tr key={i} className="border-b border-gray-50 last:border-0 group">
                                    <td className="py-5 font-bold text-gray-800">{user.name}</td>
                                    <td className="py-5"><span className="bg-gray-100 px-3 py-1 rounded text-[11px] font-medium text-gray-600">{user.role}</span></td>
                                    <td className="py-5 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button title="Update User" className="p-1.5 hover:bg-blue-50 rounded text-blue-600"><PencilSquareIcon className="w-4 h-4" /></button>
                                            <button title="Permissions" className="p-1.5 hover:bg-teal-50 rounded text-teal-600"><ShieldCheckIcon className="w-4 h-4" /></button>
                                            <button title="Delete" className="p-1.5 hover:bg-red-50 rounded text-red-600"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                        <EllipsisVerticalIcon className="w-5 h-5 inline text-gray-400 group-hover:hidden" />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent History Table - Date din imagine */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Recent Analysis History</h3>
                        <div className="flex items-center gap-4">
                            <div className="relative flex items-center">
                                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search records..."
                                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs w-64 focus:outline-none"
                                    value={historySearch}
                                    onChange={(e) => setHistorySearch(e.target.value)}
                                />
                            </div>
                            <button className="text-xs font-bold text-blue-700">View all reports</button>
                        </div>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400">
                        <tr>
                            <th className="px-8 py-4 text-left">Image</th>
                            <th className="px-8 py-4 text-left">Patient</th>
                            <th className="px-8 py-4 text-left">Result</th>
                            <th className="px-8 py-4 text-left">Date</th>
                            <th className="px-8 py-4 text-right tracking-widest">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredHistory.map((row, i) => (
                            <tr key={i} className="border-b border-gray-50 last:border-0">
                                <td className="px-8 py-5"><div className="w-10 h-10 bg-black rounded-lg shadow-inner flex items-center justify-center"><div className="w-5 h-5 border border-blue-900/30 rounded-full"></div></div></td>
                                <td className="px-8 py-5 font-bold text-gray-800">{row.patient}</td>
                                <td className="px-8 py-5"><span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${row.status}`}>{row.result}</span></td>
                                <td className="px-8 py-5 text-gray-500 font-medium">{row.date}</td>
                                <td className="px-8 py-5 text-right"><EllipsisVerticalIcon className="w-5 h-5 inline text-gray-400" /></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
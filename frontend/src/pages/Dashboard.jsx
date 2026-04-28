import React from 'react';
import { QuestionMarkCircleIcon, EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
        tealGreen: "#1D3E39",
        subtleGray: "#6B7280"
    };

    // Date pentru Bar Chart (Valori marite pentru vizibilitate)
    const drDistribution = [
        { label: "NORMAL", color: "#1D3E39", height: 245 },
        { label: "MILD", color: "#253D88", height: 160 },
        { label: "MODERATE", color: "#4759B3", height: 190 },
        { label: "SEVERE", color: "#B33E2D", height: 75 },
        { label: "PROLIF.", color: "#5E626D", height: 45 },
    ];

    const recentHistory = [
        { patient: "Pantea Tania", result: "Normal (99.2%)", date: "Oct 24, 2023 • 14:22", badgeColor: "bg-green-50 text-green-700 border-green-100" },
        { patient: "Turcu Flavius", result: "Moderate DR (84.1%)", date: "Oct 24, 2023 • 12:05", badgeColor: "bg-red-50 text-red-700 border-red-100" },
        { patient: "Moga Antonia", result: "Mild DR (92.5%)", date: "Oct 23, 2023 • 16:50", badgeColor: "bg-blue-50 text-blue-700 border-blue-100" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-left pb-20" style={styles.inter}>

            {/* Navbar Identic */}
            <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 w-full mb-8">
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
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2 text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 max-w-lg">
                        Visualizing retinal diagnostic performance and system health metrics.
                    </p>
                </div>

                {/* Top Stats - mb-8 adaugat */}
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

                {/* Graficele Aliniate: Stanga (Bar) | Dreapta (Donut) - mb-8 adaugat */}
                <div className="grid grid-cols-12 gap-6 mb-8">

                    {/* Graficul din STANGA - Severity Distribution */}
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
                                    {/* Bara principala - Inaltime marita */}
                                    <div
                                        className="w-12 rounded-t-sm"
                                        style={{ height: bar.height, backgroundColor: bar.color }}
                                    ></div>
                                    {/* Linia de demarcatie */}
                                    <div className="w-14 h-[1px] bg-gray-100"></div>
                                    
                                    <span className="text-[10px] font-bold text-gray-400 mt-6 tracking-tighter">{bar.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Graficul din DREAPTA - 92% Prediction Distribution */}
                    <div className="col-span-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-between">
                        <h3 className="font-bold text-gray-800 text-lg">Predictions distribution</h3>
                        <div className="relative flex justify-center items-center py-4">
                            <svg className="w-44 h-44 transform -rotate-90">
                                <circle cx="88" cy="88" r="75" stroke="#F3F4F6" strokeWidth="18" fill="transparent" />
                                <circle
                                    cx="88" cy="88" r="75" stroke="#253D88" strokeWidth="18" fill="transparent"
                                    strokeDasharray="471" strokeDashoffset={471 * (1 - 0.92)}
                                />
                                <circle
                                    cx="88" cy="88" r="75" stroke="#1D3E39" strokeWidth="18" fill="transparent"
                                    strokeDasharray="471" strokeDashoffset={471 * (1 - 0.78)}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-800">92%</span>
                            </div>
                        </div>
                        <div className="space-y-3">
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

                {/* Tabelul de Istoric - mb-8 adaugat */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden mb-8">
                    <div className="p-6 flex justify-between items-center border-b border-gray-50">
                        <h3 className="font-bold text-gray-800 text-lg">Recent Analysis History</h3>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-xs w-64 focus:outline-none" />
                            </div>
                        </div>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-gray-400">
                        <tr>
                            <th className="px-8 py-4 text-left">Image</th>
                            <th className="px-8 py-4 text-left">Patient</th>
                            <th className="px-8 py-4 text-left">Result</th>
                            <th className="px-8 py-4 text-left">Date</th>
                            <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        {recentHistory.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50/50">
                                <td className="px-8 py-4"><div className="w-10 h-10 bg-black rounded-lg"></div></td>
                                <td className="px-8 py-4 font-bold text-gray-800">{row.patient}</td>
                                <td className="px-8 py-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${row.badgeColor}`}>{row.result}</span></td>
                                <td className="px-8 py-4 text-gray-500">{row.date}</td>
                                <td className="px-8 py-4 text-right"><EllipsisVerticalIcon className="w-5 h-5 inline text-gray-400" /></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
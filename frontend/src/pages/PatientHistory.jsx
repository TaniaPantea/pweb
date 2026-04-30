import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    EyeIcon,
    ClockIcon,
    ArrowLeftIcon,
    CalendarIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const PatientHistory = ({ userRole }) => {
    const navigate = useNavigate();

    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
    };

    const [timelineData] = useState([
        { id: 1, date: "Oct 24, 2023", day: "24", month: "October", year: "2023", result: "Moderate DR", confidence: "87%", doctor: null, color: "text-red-600", observations: "Increased microaneurysms near macula." },
        { id: 2, date: "May 15, 2023", day: "15", month: "May", year: "2023", result: "Mild DR", confidence: "91%", doctor: "Dr. Sarah Johnson", color: "text-blue-600", observations: "Few dot hemorrhages detected." },
        { id: 3, date: "Jan 10, 2022", day: "10", month: "January", year: "2022", result: "Normal", confidence: "99%", doctor: "Dr. David", color: "text-green-600", observations: "No signs of diabetic retinopathy." }
    ]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const parseToDate = (day, monthName, year) => {
        const months = {
            January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
            July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        };
        return new Date(parseInt(year), months[monthName], parseInt(day));
    };

    const filteredTimeline = timelineData.filter(item => {
        const itemDate = parseToDate(item.day, item.month, item.year);

        const isStartComplete = startDate && startDate.length === 10;
        const isEndComplete = endDate && endDate.length === 10;

        const start = isStartComplete ? new Date(startDate) : null;
        const end = isEndComplete ? new Date(endDate) : null;

        const isStartValid = start && !isNaN(start.getTime());
        const isEndValid = end && !isNaN(end.getTime());

        if (isStartValid) start.setHours(0, 0, 0, 0);
        if (isEndValid) end.setHours(23, 59, 59, 999);

        const matchesStart = isStartValid ? itemDate >= start : true;
        const matchesEnd = isEndValid ? itemDate <= end : true;

        return matchesStart && matchesEnd;
    });

    useEffect(() => {
        if (userRole !== 'doctor') {
            navigate('/dashboard');
        }
    }, [userRole, navigate]);

    if (userRole !== 'doctor') return null;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-left flex flex-col" style={styles.inter}>
            <div className="flex flex-1">
                <aside className="w-64 bg-[#F1F5F9] border-r border-gray-200 py-6">
                    <div className="px-4 space-y-2">
                        <div onClick={() => navigate('/review')} className="flex items-center gap-3 p-3 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                            <EyeIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">Retinal Scans</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm font-semibold border-r-4" style={{ color: styles.deepBlue, borderRightColor: styles.deepBlue }}>
                            <ClockIcon className="w-5 h-5" />
                            <span className="text-sm">History</span>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 p-10 overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <button onClick={() => navigate('/review')} className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition">
                                    <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                                </button>
                                <div>
                                    <h1 className="text-3xl" style={{ ...styles.adlam, color: styles.deepBlue }}>Elena Rodriguez</h1>
                                    <p className="text-gray-400 text-sm font-medium">Patient Medical History</p>
                                </div>
                            </div>

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

                        <div className="space-y-4">
                            {filteredTimeline.length > 0 ? (
                                filteredTimeline.map((item) => (
                                    <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div>
                                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{item.date}</p>
                                                <h3 className={`text-xl font-bold mt-1 ${item.color}`}>{item.result}</h3>
                                                <p className="text-sm text-gray-500 mt-1">Confidence: <span className="font-semibold text-gray-700">{item.confidence}</span></p>
                                            </div>
                                            <div className="text-sm md:text-right">
                                                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Reviewed By</p>
                                                <p className={`font-semibold ${item.doctor ? "text-gray-800" : "text-red-600"}`}>{item.doctor ? item.doctor : "Needs Review"}</p>
                                            </div>
                                        </div>
                                        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-5">
                                            <div className="md:col-span-2">
                                                <div className="h-20 w-20 bg-gray-900 rounded-xl flex items-center justify-center">
                                                    <CalendarIcon className="w-8 h-8 text-white/20" />
                                                </div>
                                            </div>
                                            <div className="md:col-span-10 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                <p className="text-sm text-gray-600 leading-relaxed">{item.observations}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400 italic">
                                    No records found for the selected date range.
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
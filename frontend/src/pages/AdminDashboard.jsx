import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    EllipsisVerticalIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    TrashIcon,
    ShieldCheckIcon,
    XMarkIcon,
    ClockIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = ({ userRole }) => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [historySearch, setHistorySearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isHistoryEditOpen, setIsHistoryEditOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);

    const [users, setUsers] = useState([
        { id: 1, name: "Dr. David", role: "Ophthalmologist", lastActive: "2 hours ago" },
        { id: 2, name: "Elena Lopez", role: "User", lastActive: "5 mins ago" },
        { id: 3, name: "Marcus King", role: "User", lastActive: "Yesterday" },
    ]);

    const [historyData, setHistoryData] = useState([
        { id: 101, patient: "Pantea Tania", result: "Normal (99.2%)", date: "Oct 24, 2023 • 14:22", badgeColor: "bg-green-50 text-green-700 border-green-100", status: true },
        { id: 102, patient: "Turcu Flavius", result: "Moderate DR (84.1%)", date: "Oct 24, 2023 • 12:05", badgeColor: "bg-red-50 text-red-700 border-red-100", status: false },
        { id: 103, patient: "Moga Antonia", result: "Mild DR (92.5%)", date: "Oct 23, 2023 • 16:50", badgeColor: "bg-blue-50 text-blue-700 border-blue-100", status: false },
    ]);

    useEffect(() => {
        if (userRole !== 'admin') {
            navigate('/dashboard');
        }
    }, [userRole, navigate]);

    if (userRole !== 'admin') {
        return null;
    }
    const styles = {
        adlam: { fontFamily: "'ADLaM Display', sans-serif" },
        inter: { fontFamily: "'Inter', sans-serif" },
        deepBlue: "#003178",
        darkTeal: "#1D3E39",
    };
    const distribution = [
        { l: "No DR", v: 64, c: styles.darkTeal },
        { l: "Mild", v: 18, c: "#253D88" },
        { l: "Moderate", v: 10, c: "#4759B3" },
        { l: "Severe", v: 8, c: "#B33E2D" }
    ];


    const handleEditClick = (user) => {
        setSelectedUser({ ...user });
        setIsEditModalOpen(true);
    };

    const handleSaveUser = () => {
        setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
        setIsEditModalOpen(false);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm("Sigur vrei să ștergi acest utilizator?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleSaveHistory = () => {
        setHistoryData(historyData.map(h => h.id === selectedHistory.id ? selectedHistory : h));
        setIsHistoryEditOpen(false);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (roleFilter === "All" || user.role === roleFilter)
    );

    const filteredHistory = historyData.filter(row => {
        const matchesSearch = row.patient.toLowerCase().includes(historySearch.toLowerCase()) ||
            row.result.toLowerCase().includes(historySearch.toLowerCase());
        const matchesStatus = statusFilter === "all" ? true :
            statusFilter === "reviewed" ? row.status === true : row.status === false;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20 text-left" style={styles.inter}>
            <div className="max-w-7xl px-10 mx-auto pt-10">
                <h1 className="text-5xl mb-10" style={{ ...styles.adlam, color: styles.deepBlue }}>Admin Dashboard</h1>

                <div className="grid grid-cols-4 gap-6 mb-8">
                    {[{ l: "TOTAL USERS", v: users.length }, { l: "TOTAL ANALYSES", v: "42,902" }, { l: "AVG FIDELITY", v: "0.89" }, { l: "AVG STABILITY", v: "0.89" }].map((s, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                            <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">{s.l}</p>
                            <p className="text-4xl font-bold text-gray-800">{s.v}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-6 mb-8">
                    <div className="col-span-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                        <h3 className="font-bold text-gray-800 mb-8">Prediction Distribution</h3>
                        <div className="space-y-6">
                            {distribution.map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-gray-500">{item.l}</span>
                                        <span>{item.v}%</span>
                                    </div>

                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full"
                                            style={{ width: `${item.v}%`, backgroundColor: item.c }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                        <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:justify-between lg:items-center">
                            <h3 className="font-bold text-gray-800">User Management</h3>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name..."
                                        className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs w-40 focus:outline-none"
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="text-xs bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 w-36 focus:outline-none font-medium"
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                >
                                    <option value="All">All Roles</option>
                                    <option value="Ophthalmologist">Ophthalmologists</option>
                                    <option value="User">Users</option>
                                </select>
                            </div>
                        </div>

                        <table className="w-full text-sm">
                            <thead className="text-[10px] uppercase font-black text-gray-400 border-b border-gray-50">
                            <tr>
                                <th className="py-4 text-left tracking-widest w-[40%]">Name</th>
                                <th className="py-4 text-left tracking-widest w-[30%]">Role</th>
                                <th className="py-4 text-right tracking-widest w-[30%]">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-50 last:border-0 group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 font-bold text-gray-800 truncate">{user.name}</td>
                                    <td className="py-5"><span className="bg-gray-100 px-3 py-1 rounded text-[11px] font-medium text-gray-600">{user.role}</span></td>
                                    <td className="py-5 text-right">
                                        <div className="flex justify-end items-center h-8">
                                            <div className="hidden group-hover:flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                                                <button onClick={() => handleEditClick(user)} className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => alert("Permissions: Full Access")} className="p-1.5 hover:bg-teal-50 rounded-lg text-teal-600 transition-colors">
                                                    <ShieldCheckIcon className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <EllipsisVerticalIcon className="w-5 h-5 text-gray-300 group-hover:hidden" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h3 className="font-bold text-gray-800">Recent Analysis History</h3>
                        <div className="flex gap-3">
                            <div className="relative">
                                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search records..."
                                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs w-64 focus:outline-none"
                                    value={historySearch}
                                    onChange={(e) => setHistorySearch(e.target.value)}
                                />
                            </div>
                            <select
                                className="text-xs bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 w-36 focus:outline-none font-medium"
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="reviewed">Reviewed</option>
                            </select>
                        </div>
                    </div>

                    <table className="w-full table-fixed text-sm">
                        <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400">
                        <tr>
                            <th className="px-8 py-4 text-left w-[10%]">Image</th>
                            <th className="px-8 py-4 text-left w-[25%]">Patient</th>
                            <th className="px-8 py-4 text-left w-[25%]">Result</th>
                            <th className="px-8 py-4 text-left w-[15%]">Status</th>
                            <th className="px-8 py-4 text-left w-[20%]">Date</th>
                            <th className="px-8 py-4 text-right w-[10%]">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        {filteredHistory.map((row) => (
                            <tr key={row.id} className="group hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-5"><div className="w-10 h-10 bg-black rounded-lg"></div></td>
                                <td className="px-8 py-5 font-bold text-gray-800 truncate">{row.patient}</td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${row.badgeColor}`}>{row.result}</span>
                                </td>
                                <td className="px-8 py-5">
                                    {row.status ? (
                                        <div className="flex items-center gap-1.5 text-teal-600 font-bold text-[10px] uppercase"><CheckBadgeIcon className="w-4 h-4" /> Reviewed</div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-amber-500 font-bold text-[10px] uppercase"><ClockIcon className="w-4 h-4" /> Pending</div>
                                    )}
                                </td>
                                <td className="px-8 py-5 text-gray-400 text-xs font-medium">{row.date}</td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end items-center h-8">
                                        <div className="hidden group-hover:flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                                            <button onClick={() => navigate('/results')} className="text-[10px] font-bold text-blue-600 px-2 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100">VIEW</button>
                                            <button onClick={() => {setSelectedHistory({...row}); setIsHistoryEditOpen(true);}} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"><PencilSquareIcon className="w-4 h-4" /></button>
                                            <button onClick={() => setHistoryData(historyData.filter(h => h.id !== row.id))} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                        <EllipsisVerticalIcon className="w-5 h-5 text-gray-300 group-hover:hidden" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl animate-in zoom-in duration-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold" style={{ color: styles.deepBlue }}>Update User</h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full"><XMarkIcon className="w-5 h-5 text-gray-400" /></button>
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                                    <input className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm font-medium" value={selectedUser?.name} onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">System Role</label>
                                    <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm font-medium" value={selectedUser?.role} onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}>
                                        <option value="Ophthalmologist">Ophthalmologist</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => setIsEditModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">Cancel</button>
                                    <button onClick={handleSaveUser} className="flex-1 px-4 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:brightness-110 transition-all" style={{ backgroundColor: styles.deepBlue }}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isHistoryEditOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl animate-in zoom-in duration-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold" style={{ color: styles.deepBlue }}>Update Record</h2>
                                <button onClick={() => setIsHistoryEditOpen(false)} className="p-1 hover:bg-gray-100 rounded-full"><XMarkIcon className="w-5 h-5 text-gray-400" /></button>
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Patient Name</label>
                                    <input className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm font-medium" value={selectedHistory?.patient} onChange={(e) => setSelectedHistory({...selectedHistory, patient: e.target.value})} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Status</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setSelectedHistory({...selectedHistory, status: false})} className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase border transition-all ${!selectedHistory?.status ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-gray-100 text-gray-400'}`}>Pending</button>
                                        <button onClick={() => setSelectedHistory({...selectedHistory, status: true})} className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase border transition-all ${selectedHistory?.status ? 'bg-teal-50 border-teal-200 text-teal-600' : 'bg-white border-gray-100 text-gray-400'}`}>Reviewed</button>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => setIsHistoryEditOpen(false)} className="flex-1 px-4 py-3 rounded-xl bg-gray-50 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 transition-colors">Cancel</button>
                                    <button onClick={handleSaveHistory} className="flex-1 px-4 py-3 rounded-xl text-white font-bold text-xs uppercase shadow-lg shadow-blue-900/20 hover:brightness-110 transition-all" style={{ backgroundColor: styles.deepBlue }}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
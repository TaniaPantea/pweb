import React, { useEffect, useState } from 'react';
import { ArrowLeftOnRectangleIcon, XMarkIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";

const ProfileSettings = ({ userRole }) => {
    const primaryBlue = "#003178";
    const white = "#FFFFFF";
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        email: userRole === 'admin'
            ? "admin.retinaxai@hospital.org"
            : userRole === 'doctor'
                ? "dr.sarah.chen@hospital.org"
                : "user.default@hospital.org",
        role: userRole === 'admin'
            ? "System Administrator"
            : userRole === 'doctor'
                ? "Specialist Doctor"
                : "User"
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempEmail, setTempEmail] = useState(profile.email);

    const gradientStyle = {
        background: "linear-gradient(135deg, #003178 0%, #0D47A1 100%)"
    };

    const handleSave = () => {
        setProfile({ ...profile, email: tempEmail });
        setIsModalOpen(false);
    };


    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter'] text-[#455A64]">
            <main className="flex items-center justify-center py-20 px-6">
                <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="py-14 flex justify-center items-center" style={gradientStyle}>
                        <h1 className="text-white text-4xl font-normal" style={{ fontFamily: "'ADLaM Display', sans-serif" , color: white}}>
                            Account Settings
                        </h1>
                    </div>

                    <div className="p-12 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#F1F3F5] p-6 rounded-2xl">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Email Address</label>
                                <p className="text-[#455A64] font-semibold text-sm">{profile.email}</p>
                            </div>

                            <div className="bg-[#F1F3F5] p-6 rounded-2xl border border-transparent">
                                <div className="flex justify-between items-start">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Access Role</label>
                                    <LockClosedIcon className="w-3 h-3 text-gray-400" />
                                </div>
                                <p className="text-[#455A64] font-semibold text-sm opacity-60 italic">{profile.role}</p>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-gray-50 flex items-center justify-between">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-10 py-4 rounded-full text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-blue-900/20"
                                style={gradientStyle}
                            >
                                Update Profile
                            </button>

                            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#C64B4B] font-bold text-sm hover:opacity-80 transition-opacity uppercase tracking-widest text-[11px]">
                                <ArrowLeftOnRectangleIcon className="w-5 h-5 stroke-[2.5]" />
                                <span>logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-bold" style={{ color: primaryBlue }}>Edit Profile</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                                <XMarkIcon className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6 text-left">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 bg-[#F1F3F5] rounded-xl border border-transparent outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium"
                                    value={tempEmail}
                                    onChange={(e) => setTempEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                                    Access Role
                                </label>
                                <div className="relative">
                                    <input
                                        disabled
                                        className="w-full px-4 py-3 bg-gray-100 text-gray-400 rounded-xl border border-gray-200 text-sm font-medium cursor-not-allowed italic"
                                        value={profile.role}
                                    />
                                    <LockClosedIcon className="w-4 h-4 absolute right-4 top-3 text-gray-300" />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleSave} className="flex-1 py-4 rounded-xl text-white font-bold text-sm shadow-lg shadow-blue-900/10 hover:opacity-90 transition-all" style={gradientStyle}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSettings;
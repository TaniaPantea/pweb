import React from 'react';
import { QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const ProfileSettings = () => {
    const primaryBlue = "#003178";
    const gradientStyle = {
        background: "linear-gradient(135deg, #003178 0%, #0D47A1 100%)"
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter'] text-[#455A64]">
            {/* Navbar - Identic cu restul platformei */}
            <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
                <div className="flex items-center gap-12">
                    <span className="text-2xl font-bold font-['Manrope']" style={{ color: primaryBlue }}>RetinaXAI</span>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                        <a href="#" className="hover:text-[#003178]">Dashboard</a>
                        <a href="#" className="hover:text-[#003178]">Upload</a>
                        <a href="#" className="hover:text-[#003178]">Results</a>
                        <a href="#" className="border-b-2 pb-1" style={{ color: primaryBlue, borderColor: primaryBlue }}>Profile</a>
                    </div>
                </div>
                <QuestionMarkCircleIcon className="w-6 h-6 text-[#434652] cursor-pointer" />
            </nav>

            {/* Main Content */}
            <main className="flex items-center justify-center py-20 px-6">

                {/* Profile Card */}
                <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">

                    {/* Header Section cu Gradient și ADLaM Display */}
                    <div
                        className="py-14 flex justify-center items-center "
                        style={gradientStyle}
                    >
                        <h1
                            className="text-white text-4xl font-normal"
                            style={{
                                fontFamily: "'ADLaM Display', sans-serif",
                                color: "white"
                            }}
                        >
                            Account Settings
                        </h1>
                    </div>

                    {/* Form Section */}
                    <div className="p-12 space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email Address */}
                            <div className="bg-[#F1F3F5] p-6 rounded-2xl">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                                    Email Address
                                </label>
                                <p className="text-[#455A64] font-semibold text-sm">
                                    dr.sarah.chen@hospital.org
                                </p>
                            </div>

                            {/* Access Role */}
                            <div className="bg-[#F1F3F5] p-6 rounded-2xl">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                                    Access Role
                                </label>
                                <p className="text-[#455A64] font-semibold text-sm">
                                    Senior Ophthalmologist
                                </p>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="pt-12 border-t border-gray-50 flex items-center justify-between">

                            {/* Update Button cu Gradient */}
                            <button
                                className="px-10 py-4 rounded-full text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-blue-900/20"
                                style={gradientStyle}
                            >
                                Update Profile
                            </button>

                            {/* Logout Button */}
                            <button className="flex items-center gap-2 text-[#C64B4B] font-bold text-sm hover:opacity-80 transition-opacity">
                                <ArrowLeftOnRectangleIcon className="w-5 h-5 stroke-[2.5]" />
                                <span className="tracking-wider">logout</span>
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileSettings;
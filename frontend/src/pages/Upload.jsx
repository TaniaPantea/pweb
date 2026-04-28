import React from 'react';
import { CloudArrowUpIcon, CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const RetinaXAI = () => {
    const primaryBlue = "#003178";

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter'] text-[#455A64]">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
                <div className="flex items-center gap-12">
                    <span className="text-2xl font-bold font-['Manrope']" style={{ color: primaryBlue }}>RetinaXAI</span>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                        <a href="#" className="hover:text-[#003178]">Dashboard</a>
                        <a href="#" className="border-b-2 pb-1" style={{ color: primaryBlue, borderColor: primaryBlue }}>Upload</a>
                        <a href="#" className="hover:text-[#003178]">Results</a>
                        <a href="#" className="hover:text-[#003178]">Profile</a>
                    </div>
                </div>
                <QuestionMarkCircleIcon className="w-6 h-6 text-434652 cursor-pointer" />
            </nav>

            <main className="max-w-6xl mx-auto py-16 px-6">

                {/* --- SECȚIUNEA CENTRATĂ --- */}
                <div className="mb-16 flex flex-col items-center text-center">
                    <h1
                        className="text-5xl mb-6"
                        style={{ color: "#003178", fontFamily: "'ADLaM Display', sans-serif",}}
                    >
                        Upload Retinal Image
                    </h1>
                    <p className="text-gray-600 max-w-3xl font-['Inter'] leading-relaxed text-lg px-4">
                        Utilize our high-precision AI diagnostics to identify early signs of retinopathy.
                        Ensure images are clear and correctly centered for optimal analysis.
                    </p>
                </div>
                {/* --------------------------- */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Coloana Stânga: Guidelines */}
                    <div className="lg:col-span-4 space-y-6 text-left">
                        <div className="bg-white p-8 rounded-2xl border border-dashed border-blue-200">
                            <h3 className="text-lg font-extrabold mb-6 font-['Manrope'] border-b border-gray-50 pb-2" style={{ color: primaryBlue }}>
                                Quality Guidelines
                            </h3>
                            <ul className="space-y-5">
                                <li className="flex gap-4 items-start">
                                    <CheckCircleIcon className="w-6 h-6 text-green-600 shrink-0" />
                                    <div className="font-['Inter']">
                                        <p className="font-bold text-sm text-[#455A64]">Optimal Illumination</p>
                                        <p className="text-xs text-gray-400">Uniform lighting across the fundus field.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <CheckCircleIcon className="w-6 h-6 text-green-600 shrink-0" />
                                    <div className="font-['Inter']">
                                        <p className="font-bold text-sm text-[#455A64]">Centration</p>
                                        <p className="text-xs text-gray-400">Macula and Optic Disc should be clearly visible.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <XCircleIcon className="w-6 h-6 text-red-500 shrink-0" />
                                    <div className="font-['Inter']">
                                        <p className="font-bold text-sm text-[#455A64]">Avoid Artifacts</p>
                                        <p className="text-xs text-gray-400">Minimize lens flares or corneal reflections.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#F1F3F5] p-6 rounded-2xl">
                            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-2 font-['Inter']">Supported Formats</p>
                            <p className="text-sm font-semibold text-[#455A64] font-['Inter']">Supported formats: JPG, PNG</p>
                        </div>
                    </div>

                    {/* Coloana Dreapta: Upload */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Dropzone - Versiunea Identică Vizual */}
                        <div className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-16 bg-white flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#003178] transition-all" style={{ backgroundColor: '#F3F4F5' }}>

                            {/* Iconița Cloud - Albastru 0D47A1 din paletă pentru conformitate vizuală */}
                            <CloudArrowUpIcon className="w-16 h-16 text-[#0D47A1] mb-6" />

                            {/* Titlul - Manrope, Albastru 0D47A1, Liniat pe centru, lățime maximă */}
                            <h2 className="text-2xl font-bold text-[#0D47A1] mb-12 font-['Manrope'] max-w-xl mx-auto leading-tight text-center">
                                Drag & drop image here or Browse files
                            </h2>

                            {/* Butonul Select - Gri E9ECEF (Secondary dintr-o paletă similară, cum este Neutral #F1F3F5), text gri închis 455A64 */}
                            <button className="bg-[#E9ECEF] text-[#455A64] px-12 py-4 rounded-full font-bold text-sm font-['Inter'] hover:bg-[#DDE2E5] transition-colors shadow-sm">
                                Select Retinal Scan
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Card Imagine */}
                            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-left">
                                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black">
                                    <img src="/imgLight.png" alt="Scan" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex justify-between items-center px-2 py-4">
                                    <div>
                                        <p className="text-xs font-bold text-[#455A64] font-['Inter']">SCAN_092123_OD.jpg</p>
                                        <p className="text-[10px] text-gray-400 font-['Inter'] mt-1">4.2 MB • 3200 x 2400</p>
                                    </div>
                                    <TrashIcon className="w-5 h-5 text-gray-300 hover:text-red-500 cursor-pointer" />
                                </div>
                            </div>

                            {/* Card Analiză */}
                            <div className="rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-xl shadow-blue-900/10" style={{ backgroundColor: primaryBlue }}>
                                <h3 className="text-xl font-extrabold text-white mb-10 font-['Manrope'] tracking-tight">
                                    Ready for Analysis
                                </h3>
                                <button
                                    className="bg-white mt-12 w-full py-4 rounded-full font-extrabold text-xs font-['Manrope'] uppercase tracking-[0.1em] hover:bg-gray-50 transition-transform active:scale-[0.97]"
                                    style={{ color: primaryBlue }}
                                >
                                    Analyze Image
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default RetinaXAI;
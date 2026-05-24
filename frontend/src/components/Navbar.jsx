import React from "react";
import { Link, useLocation } from "react-router-dom";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const Navbar = ({ userRole }) => {
    const location = useLocation();
    const primaryBlue = "#003178";

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        isActive(path)
            ? "border-b-2 pb-1 font-bold text-[#003178] border-[#003178]"
            : "text-gray-500 hover:text-[#003178] transition-colors";

    // Dinamic: Stabilim unde trimite logo-ul în funcție de rol
    const getLogoRedirectPath = () => {
        if (userRole === "doctor") return "/dashboard";
        if (userRole === "admin") return "/admin-dashboard";
        return "/upload"; // Pacienții sau utilizatorii simpli merg implicit la Upload
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 font-['Inter']">
            <div className="flex items-center gap-12">
                <Link
                    to={getLogoRedirectPath()}
                    className="text-2xl font-bold font-['Manrope']"
                    style={{ color: primaryBlue, textDecoration: "none" }}
                >
                    RetinaXAI
                </Link>

                <div className="hidden md:flex gap-6 text-sm font-medium flex-wrap">
                    {/* DASHBOARD - Vizibil doar pentru Medici și Admini */}
                    {(userRole === "doctor" || userRole === "admin") && (
                        <Link to="/dashboard" className={linkClass("/dashboard")}>
                            Dashboard
                        </Link>
                    )}

                    {/* UPLOAD - Vizibil doar pentru Pacienți / Utilizatori standard */}
                    {userRole !== "doctor" && userRole !== "admin" && (
                        <Link to="/upload" className={linkClass("/upload")}>
                            Upload
                        </Link>
                    )}

                    {/* HISTORY - Vizibil doar pentru Pacienți / Utilizatori standard în noul flux */}
                    {userRole !== "doctor" && userRole !== "admin" && (
                        <Link to="/patientHistory" className={linkClass("/patientHistory")}>
                            History
                        </Link>
                    )}

                    {/* ADMIN CONSOLE - Vizibil doar pentru Administratori */}
                    {userRole === "admin" && (
                        <Link to="/admin-dashboard" className={linkClass("/admin-dashboard")}>
                            Admin Dashboard
                        </Link>
                    )}

                    {/* PROFILE - Vizibil pentru toată lumea */}
                    <Link to="/profile" className={linkClass("/profile")}>
                        Profile
                    </Link>
                </div>
            </div>

            <QuestionMarkCircleIcon
                className="w-6 h-6 text-[#434652] cursor-pointer hover:text-[#003178] transition-colors"
            />
        </nav>
    );
};

export default Navbar;
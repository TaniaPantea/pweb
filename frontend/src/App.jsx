import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Upload from "./pages/Upload.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Results from "./pages/Results.jsx";
import Profile from "./pages/Profile.jsx";
import Review from "./pages/Review.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PatientHistory from "./pages/PatientHistory.jsx";
import Navbar from "./components/Navbar.jsx";
import { useState, useEffect } from "react"; // <--- Am adăugat useEffect

function AppContent() {
    const location = useLocation();

    // Citim rolul salvat în localStorage. Dacă nu există (utilizatorul e deconectat), punem un rol gol sau 'guest'
    const [userRole, setUserRole] = useState(localStorage.getItem('user_role') || 'guest');

    // Acest useEffect ascultă schimbările de rută și actualizează rolul în timp real.
    // Este extrem de util imediat după ce utilizatorul apasă pe "Login" și este redirecționat!
    useEffect(() => {
        const currentRole = localStorage.getItem('user_role');
        if (currentRole) {
            setUserRole(currentRole);
        } else {
            setUserRole('guest');
        }
    }, [location]);

    const hideNavbarRoutes = ["/", "/login", "/register", "/about"];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            {shouldShowNavbar && <Navbar userRole={userRole} />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/results" element={<Results userRole={userRole} />} />
                <Route path="/profile" element={<Profile />} /> {/* Am scos userRole de aici pentru că Profile își ia singur datele acum */}
                <Route path="/review" element={<Review userRole={userRole}/>} />
                <Route path="/dashboard" element={<Dashboard userRole={userRole} />} /> {/* Adăugat userRole opțional și aici dacă ai nevoie în Dashboard */}
                <Route
                    path="/admin-dashboard"
                    element={<AdminDashboard userRole={userRole} />}
                />
                <Route
                    path="/patientHistory"
                    element={<PatientHistory userRole={userRole} />}
                />
            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
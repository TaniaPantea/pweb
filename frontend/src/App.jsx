import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/login">Login</Link> |{" "}
                <Link to="/upload">Upload</Link> |{" "}
                <Link to="/register">Register</Link> |{" "}
                <Link to="/results">Results</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/review">Review</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/adminDashboard">AdminDashboard</Link>
            </nav>

            <hr />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/results" element={<Results />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/review" element={<Review />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/adminDashboard" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
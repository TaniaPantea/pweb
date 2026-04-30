
import { useNavigate } from 'react-router-dom';
const RetinaXAIHome = () => {
    const navigate = useNavigate();
    const handleGetStarted = (e) => {
        e.preventDefault();
        navigate('/login');
    };
    return (
        <div className="min-h-screen bg-white font-['Inter',_sans-serif]">
            <nav className="flex justify-between items-center px-12 py-8">
                <div className="text-3xl font-extrabold tracking-tight text-[#003178]">
                    RetinaXAI
                </div>

                <div className="flex gap-10 items-center text-lg font-medium text-black">
                    <a href="#" className="hover:opacity-70 transition" onClick={() => navigate('/about')}>About</a>
                    <a href="#" className="hover:opacity-70 transition" onClick={() => navigate('/login')}>Login</a>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-12 pt-12 flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 flex flex-col items-start text-left">
                    <h1 className="text-6xl font-bold leading-[1.1] mb-6 text-[#003178]" style={{ color: "#003178" }}>
                        AI-Powered Diabetic <br /> Retinopathy Detection
                    </h1>

                    <p className="text-xl leading-relaxed mb-10 max-w-lg text-[#003178] opacity-55">
                        Upload retinal images and receive explainable AI predictions with visual insights.
                    </p>

                    <button onClick={handleGetStarted} className="bg-[#003178] text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-[#00265d] transition shadow-md">
                        Get Started
                    </button>
                </div>

                <div className="md:w-1/2 mt-12 md:mt-0 flex justify-start md:justify-end">
                    <img
                        src="/imgRetina.jpg"
                        alt="Retina Illustration"
                        className="w-full max-w-2xl object-contain"
                    />
                </div>
            </main>

            <section className="max-w-7xl mx-auto px-12 mt-22 mb-22 text-left">
                <h2 className="text-4xl font-bold mb-14 text-[#003178]" style={{ color: "#003178" }}>
                    Key Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white border border-slate-100 rounded-2xl py-10 px-5 shadow-sm flex flex-col items-start">
                        <h3 className="text-xl font-bold mb-4 text-[#003178]">
                            Upload Retinal Images
                        </h3>
                        <p className="text-[#003178] leading-relaxed">
                            Easily upload retinal scans for analysis.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl py-10 px-5 shadow-sm flex flex-col items-start">
                        <h3 className="text-xl font-bold mb-4 text-[#003178]">
                            AI Diagnosis
                        </h3>
                        <p className="text-[#003178] leading-relaxed">
                            Receive automatic predictions using deep learning models.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl py-10 px-5 shadow-sm flex flex-col items-start">
                        <h3 className="text-xl font-bold mb-4 text-[#003178]">
                            Explainable Results
                        </h3>
                        <p className="text-[#003178] leading-relaxed">
                            Visualize model decisions using heatmaps and metrics.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="border-t border-slate-50 py-10 px-12">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-x-10 gap-y-4 text-sm items-center">
                    <div className="flex items-center gap-3 text-[#003178]">
                        <img src="/imgLoading.png" alt="Loading icon" className="w-6 h-6 object-contain" />
                        <span className="font-bold">2026 RetinaXAI</span>
                    </div>

                    <span className="font-medium text-[#003178] opacity-55">
            Pantea Tania Georgiana
          </span>

                    <span className="font-medium text-[#003178] opacity-55">
            Coordonator: Groza Adrian
          </span>
                </div>
            </footer>
        </div>
    );
};

export default RetinaXAIHome;
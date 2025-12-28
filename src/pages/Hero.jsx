import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-indigo-800 px-6">
      <div className="max-w-3xl text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Volunteer Management System
        </h1>

        <p className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed">
          A simple and efficient platform to manage volunteers, projects,
          assignments, and attendance — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-indigo-100 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/about")}
            className="px-8 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

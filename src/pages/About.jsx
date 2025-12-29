import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-indigo-700 font-semibold text-lg hover:text-indigo-800"
          >
            VolunteerMS
          </Link>

          <nav className="flex gap-4">
            <Link
              to="/"
              className="text-slate-600 hover:text-indigo-700 transition"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-slate-600 hover:text-indigo-700 transition"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              About the Volunteer Management System
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A simple platform designed to help organizations manage volunteers,
              projects, assignments, and attendance with ease.
            </p>
          </div>

          {/* Sections */}
          <div className="grid gap-10 md:grid-cols-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-indigo-700 mb-3">
                Our Mission
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our mission is to simplify volunteer coordination by providing a
                centralized system that improves organization, accountability,
                and impact.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-indigo-700 mb-3">
                What We Do
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We enable organizations to manage volunteers, assign projects,
                track attendance, and monitor performance — all in one secure
                platform.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                Key Features
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 text-slate-600">
                <li>✔ Volunteer registration and management</li>
                <li>✔ Project and assignment tracking</li>
                <li>✔ Attendance monitoring</li>
                <li>✔ Secure authentication and role-based access</li>
                <li>✔ Clean dashboard and reporting</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Ready to get started?
            </h3>
            <p className="text-slate-600 mb-6">
              Sign in to manage volunteers and projects efficiently.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/"
                className="px-6 py-3 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
              >
                Back to Home
              </Link>

              <Link
                to="/register"
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

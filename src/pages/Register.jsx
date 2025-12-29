import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from '../api/user';

export default function Register({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await createUser({ email, password, firstName, lastName });
      
      const { token, user } = response.data;

        

      // Save token and set user state
      localStorage.setItem("token", token);
      if (setUser) setUser(user);

      // Redirect directly to Login
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Register new User</h2>
          <p className="text-slate-500">Register to login to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div>
             <label className="block text-sm font-medium text-slate-600 mb-1">
                 First Name
             </label>
             <input
              type="text"
                 placeholder="John"
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}
                 required
                 className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
             />
            </div>
            <div>
             <label className="block text-sm font-medium text-slate-600 mb-1">
                 Last Name
             </label>
             <input
              type="text"
                 placeholder="Doe"
                 value={lastName}
                 onChange={(e) => setLastName(e.target.value)}
                 required
                 className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
             />
            </div>

            <label className="block text-sm font-medium text-slate-600 mb-1">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <Link to="/" className="hover:text-indigo-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

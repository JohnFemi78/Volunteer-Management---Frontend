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
      console.log("Full Response:", response);
      
      const { access_token, user } = response.data;

        

      // Save token and set user state
      localStorage.setItem("token", access_token);
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-10">
  
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">
            Register to access your dashboard
          </p>
        </div>
  
        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm border border-red-200">
            {error}
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-6">
  
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
  
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
  
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
  
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
  
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
  
        </form>
  
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </div>
  
      </div>
    </div>
  );
}

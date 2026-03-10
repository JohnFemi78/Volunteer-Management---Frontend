import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from '../api/user';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser ({ email, password });

      const { access_token, user } = response.data;
        
      // Save token to localStorage
      localStorage.setItem("token", access_token);

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      // Update state to show Sidebar/Topbar
      if (setAuth) setAuth(true);
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-10">
  
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">
            Login to access your dashboard
          </p>
        </div>
  
        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm border border-red-200">
            {error}
          </div>
        )}
  
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
  
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
  
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
  
        </form>
  
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </Link>
        </div>
  
      </div>
    </div>
  );
}

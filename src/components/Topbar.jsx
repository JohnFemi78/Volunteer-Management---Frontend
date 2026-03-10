import React from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b">
  <h1 className="text-2xl font-semibold text-indigo-600">Dashboard</h1>

  <div className="flex items-center gap-4">
    
    {/* Avatar */}
    <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold">
      {user?.firstName?.charAt(0) || "G"}
    </div>

    {/* User Name */}
    <span className="text-sm font-medium text-gray-700">
      {user?.firstName || "Guest"}
    </span>

    {/* Sign Out */}
    <button
      onClick={() => navigate("/logout")}
      className="text-sm text-gray-500 hover:text-red-500 transition"
    >
      Sign Out
    </button>

  </div>
</header>
  );
}
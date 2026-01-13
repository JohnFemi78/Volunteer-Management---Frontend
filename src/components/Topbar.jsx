import React from "react";
import { useNavigate } from "react-router-dom";``

export default function Topbar() {
  const navigate = useNavigate();
 const userName = JSON.parse(localStorage.getItem("user"));
  return (
    
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b">
      <h1 className="text-2xl font-semibold text-indigo-600">Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm">
          {userName || "Guest"}
        </span>
        <div className="w-8 h-8 bg-slate-200 rounded-full" />
        <h3 className="text-sm" onClick={() => navigate("/logout")}>Sign Out</h3>
      </div>
    </header>
  );
}

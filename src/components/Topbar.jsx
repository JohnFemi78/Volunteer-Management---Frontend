import React from "react";

export default function Topbar() {
  
 const userName = JSON.parse(localStorage.getItem("user"));
  return (
    
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm">
          {userName || "Guest"}
        </span>
        <div className="w-8 h-8 bg-slate-200 rounded-full" />
      </div>
    </header>
  );
}

import React from 'react'

export default function Topbar(){
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-slate-100">☰</button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm">John Femi</div>
        <div className="w-8 h-8 bg-slate-200 rounded-full" />
      </div>
    </header>
  )
}
import React from 'react'

export default function Table({columns, data}){
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow">
      <table className="min-w-full">
        <thead className="text-left text-sm text-slate-500 border-b">
          <tr>
            {columns.map((c,i)=>(<th key={i} className="px-4 py-3">{c.header}</th>))}
          </tr>
        </thead>
        <tbody>
          {data.map((row,ri)=> (
            <tr key={ri} className="hover:bg-slate-50 border-b">
              {columns.map((c,ci)=>(<td key={ci} className="px-4 py-3">{c.cell ? c.cell(row) : row[c.accessor]}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
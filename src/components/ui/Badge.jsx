import React from 'react'

export default function Badge({children, tone='default'}){
  const map = {
    default: 'bg-slate-100 text-slate-800',
    success: 'bg-emerald-100 text-emerald-800',
    danger: 'bg-rose-100 text-rose-800',
    warn: 'bg-amber-100 text-amber-800'
  }
  return <span className={`px-2 py-1 rounded-full text-xs ${map[tone]||map.default}`}>{children}</span>
}
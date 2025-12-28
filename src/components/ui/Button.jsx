import React from 'react'

export default function Button({children, onClick, className='', variant='primary'}){
  const base = 'px-4 py-2 rounded-md font-medium';
  const style = variant === 'primary' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white border';
  return (
    <button onClick={onClick} className={`${base} ${style} ${className}`}>{children}</button>
  )
}
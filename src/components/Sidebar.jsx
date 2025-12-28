import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({to, children}) => (
  <NavLink to={to} className={({isActive}) => `flex items-center gap-3 p-3 rounded-md hover:bg-white hover:shadow ${isActive ? 'bg-white shadow' : ''}`}>
    {children}
  </NavLink>
)

export default function Sidebar(){
  return (
    <aside className="w-64 bg-indigo-600 text-white p-4 flex flex-col gap-4">
      <div className="text-2xl font-semibold">VolunteerUI</div>
      <nav className="flex flex-col gap-1 mt-4">
        <NavItem to="/dashboard">🏠 Dashboard</NavItem>
        <NavItem to="/volunteers">👥 Volunteers</NavItem>
        <NavItem to="/projects">📁 Projects</NavItem>
        <NavItem to="/assignments">🔗 Assignments</NavItem>
        <NavItem to="/attendance">🗓 Attendance</NavItem>
      </nav>
      <div className="mt-auto text-sm opacity-80">© {new Date().getFullYear()} NGO</div>
    </aside>
  )
}

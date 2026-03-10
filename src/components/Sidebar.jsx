import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Folder, Link2, CalendarCheck, Shield } from "lucide-react";

const NavItem = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
         hover:bg-white hover:text-indigo-600 hover:shadow-lg
         ${isActive ? "text-indigo-600 font-semibold" : "text-white"}`
      }
    >
      {/* Active Indicator */}
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-white transition-all duration-300
        ${window.location.pathname === to ? "opacity-100" : "opacity-0"}`}
      ></span>
      
      {/* Icon */}
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      
      {/* Text */}
      <span className="text-lg">{children}</span>
    </NavLink>
  );
};

export default function Sidebar() {
  // Get logged in User
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  return (
    <aside className="w-64 bg-linear-to-b from-indigo-700 to-indigo-500 text-white p-6 flex flex-col h-screen shadow-lg">
      {/* Logo */}
      <div className="text-3xl font-bold mb-8 tracking-wide drop-shadow-lg">
        VolunteerUI
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavItem to="/dashboard" icon={Home}>Dashboard</NavItem>
        <NavItem to="/volunteers" icon={Users}>Volunteers</NavItem>
        <NavItem to="/projects" icon={Folder}>Projects</NavItem>
        <NavItem to="/assignmentLists" icon={Link2}>Assignments</NavItem>
        <NavItem to="/attendance" icon={CalendarCheck}>Attendance</NavItem>

        {/* ADMIN BUTTON */}
        {role === "ADMIN" && (
          <NavItem to="/admin" icon={Shield}>
            Admin
          </NavItem>
        )}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-sm opacity-80 text-center pt-4 border-t border-white/30">
        © {new Date().getFullYear()} NGO
      </div>
    </aside>
  );
}
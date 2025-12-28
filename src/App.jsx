import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import VolunteersList from "./pages/Volunteers/VolunteersList";
import VolunteerDetails from "./pages/Volunteers/VolunteerDetails";
import EditVolunteer from "./pages/Volunteers/EditVolunteer";
import CreateVolunteer from "./pages/Volunteers/CreateVolunteer";

import ProjectsList from "./pages/Projects/ProjectsList";
import ProjectDetails from "./pages/Projects/ProjectDetails";

import Assignments from "./pages/Assignments/Assignments";

import AttendanceList from "./pages/Attendance/AttendanceList";
import CreateAttendance from "./pages/Attendance/CreateAttendance";
import EditAttendance from "./pages/Attendance/EditAttendance";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="register" element={<Register />} />

            {/* Volunteers */}
            <Route path="/volunteers-create" element={<CreateVolunteer />} />
            <Route path="/volunteer-list" element={<VolunteersList />} />
            <Route path="/volunteer-details/:id" element={<VolunteerDetails />} />
            <Route path="/volunteer/edit/:id" element={<EditVolunteer />} />
            <Route path="/login" element={<Login />} />

            {/* Projects */}
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />

            {/* Attendance */}
            <Route path="/attendance-list" element={<AttendanceList />} />
            <Route path="/attendance/create" element={<CreateAttendance />} />
            <Route path="/attendance/edit/:id" element={<EditAttendance />} />

            {/* Assignments */}
            <Route path="/assignments" element={<Assignments />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

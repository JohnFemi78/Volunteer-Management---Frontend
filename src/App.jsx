import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import VolunteersList from "./pages/Volunteers/VolunteersList";
import VolunteerDetails from "./pages/Volunteers/VolunteerDetails";
import EditVolunteer from "./pages/Volunteers/EditVolunteer";
import CreateVolunteer from "./pages/Volunteers/CreateVolunteer";

import ProjectsList from "./pages/Projects/ProjectsList";
import ProjectDetails from "./pages/Projects/ProjectDetails";
import CreateProject from "./pages/Projects/CreateProject";

import AssignmentDetails from "./pages/Assignments/AssignmentDetails";
import AssignmentLists from "./pages/Assignments/AssignmentLists";
import CreateAssignment from "./pages/Assignments/CreateAssignment";
import EditAssignment from "./pages/Assignments/EditAssignment";

import AttendanceList from "./pages/Attendance/AttendanceList";
import CreateAttendance from "./pages/Attendance/CreateAttendance";
import EditAttendance from "./pages/Attendance/EditAttendance";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SignOut from "./pages/SignOut";


const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;  
  };
function App() {
  const location = useLocation();
const isAuthenticated = !!localStorage.getItem("token");
  
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {isAuthenticated && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {isAuthenticated && <Topbar />}

        <main className="p-6 overflow-auto">
          <Routes location={location}>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<ProtectedRoute><SignOut /></ProtectedRoute>} />
            {/* Volunteers */}
            <Route path="/volunteer/create" element={<ProtectedRoute><CreateVolunteer /></ProtectedRoute>} />
            <Route path="/volunteers" element={<ProtectedRoute><VolunteersList /></ProtectedRoute>} />
            <Route path="/volunteer/:id" element={<ProtectedRoute><VolunteerDetails /></ProtectedRoute>} />
            <Route path="/volunteer/edit/:id" element={<ProtectedRoute><EditVolunteer /></ProtectedRoute>} />

            {/* Projects */}
            <Route path="/projects" element={<ProtectedRoute><ProjectsList /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
            <Route path="/CreateProject" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />


            {/* Attendance */}
            <Route path="/attendance" element={<ProtectedRoute><AttendanceList /></ProtectedRoute>} />
            <Route path="/attendance/create" element={<ProtectedRoute><CreateAttendance /></ProtectedRoute>} />
            <Route path="/attendance/edit/:id" element={<ProtectedRoute><EditAttendance /></ProtectedRoute>} />

            {/* Assignments */}
            <Route path="/assignmentDetails" element={<ProtectedRoute><AssignmentDetails /></ProtectedRoute>} />
            <Route path="/assignmentLists" element={<ProtectedRoute><AssignmentLists /></ProtectedRoute>} />
            <Route path="/assignment" element={<ProtectedRoute><CreateAssignment /></ProtectedRoute>} />
            <Route path="/assignment/edit/:id" element={<ProtectedRoute><EditAssignment /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

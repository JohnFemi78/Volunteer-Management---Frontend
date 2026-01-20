import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

// Utils
import { isAuthenticated } from "./utils/auth";

// Public pages
import Hero from "./pages/Hero";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SignOut from "./pages/auth/SignOut";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Volunteers
import VolunteersList from "./pages/volunteers/VolunteersList";
import VolunteerDetails from "./pages/volunteers/VolunteerDetails";
import CreateVolunteer from "./pages/volunteers/CreateVolunteer";
import EditVolunteer from "./pages/volunteers/EditVolunteer";

// Projects
import ProjectsList from "./pages/projects/ProjectsList";
import ProjectDetails from "./pages/projects/ProjectDetails";
import CreateProject from "./pages/projects/CreateProject";

// Attendance
import AttendanceList from "./pages/attendance/AttendanceList";
import AttendanceDetails from "./pages/attendance/AttendanceDetails";
import CreateAttendance from "./pages/attendance/CreateAttendance";
import EditAttendance from "./pages/attendance/EditAttendance";

// Assignments
import AssignmentLists from "./pages/assignments/AssignmentLists";
import AssignmentDetails from "./pages/assignments/AssignmentDetails";
import CreateAssignment from "./pages/assignments/CreateAssignment";
import EditAssignment from "./pages/assignments/EditAssignment";

export default function App() {
  const location = useLocation();
  const authenticated = isAuthenticated();

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {authenticated && <Sidebar />}

      <div className="flex flex-1 flex-col">
        {authenticated && <Topbar />}

        <main className="p-6 overflow-auto">
          <Routes location={location}>
            {/* 🌍 Public routes */}
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🔐 Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/logout" element={<SignOut />} />

              {/* Volunteers */}
              <Route path="/volunteers" element={<VolunteersList />} />
              <Route path="/volunteer/create" element={<CreateVolunteer />} />
              <Route path="/volunteer/:id" element={<VolunteerDetails />} />

              {/* Projects */}
              <Route path="/projects" element={<ProjectsList />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/projects/create" element={<CreateProject />} />

              {/* Attendance */}
              <Route path="/attendance" element={<AttendanceList />} />
              <Route path="/attendance/create" element={<CreateAttendance />} />
              <Route
                path="/attendanceDetails/:id"
                element={<AttendanceDetails />}
              />

              {/* Assignments */}
              <Route path="/assignmentLists" element={<AssignmentLists />} />
              <Route
                path="/assignmentDetails/:id"
                element={<AssignmentDetails />}
              />
              <Route path="/assignment" element={<CreateAssignment />} />

              {/* 🔒 ADMIN-only routes */}
              <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/volunteer/edit/:id" element={<EditVolunteer />} />
                <Route path="/attendance/edit/:id" element={<EditAttendance />} />
                <Route path="/assignment/edit/:id" element={<EditAssignment />} />
              </Route>
            </Route>

            {/* 🚫 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

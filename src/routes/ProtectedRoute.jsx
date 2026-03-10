import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles}) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
;
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // Restrictions of roles
  if (allowedRoles && (!user || !allowedRoles.includes(user?.role))) {
    return <navigate to="/dashboard" replace />
  }

  return <Outlet />;
}

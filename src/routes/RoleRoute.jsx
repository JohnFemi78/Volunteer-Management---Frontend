import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function RoleRoute({ allowedRoles }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-600">
          Access denied — insufficient permissions
        </p>
      </div>
    );
  }

  return <Outlet />;
}

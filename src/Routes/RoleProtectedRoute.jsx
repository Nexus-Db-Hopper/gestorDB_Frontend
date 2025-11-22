import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // No hay sesión
  if (!token) return <Navigate to="/login" replace />;

  // No hay rol guardado (evita bugs)
  if (!userRole) return <Navigate to="/unauthorized" replace />;

  // Validación de rol (exacto)
  if (userRole !== role) return <Navigate to="/unauthorized" replace />;

  return children;
}

import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // No hay sesión / redirige a login
  if (!token) return <Navigate to="/login" replace />;

  // Si hay children, regrésalos
  if (children) return children;

  // Si se usa como ruta anidada, usa <Outlet />
  return <Outlet />;
}

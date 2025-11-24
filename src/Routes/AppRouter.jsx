import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";
import Layout from "../components/Layout/Layout";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import Unauthorized from "../components/Unauthorized";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS PROTEGIDAS */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard Admin */}
          <Route
            path="/dashboard/admin"
            element={
              <RoleProtectedRoute role="Admin">
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* Dashboard User */}
          <Route
            path="/dashboard/user"
            element={
              <RoleProtectedRoute role="User">
                <UserDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* Perfil (cualquiera con token) */}
          <Route path="/profile" element={<Profile />} />

          {/* Configuración (cualquiera con token) */}
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Acceso denegado */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404: cualquier otra ruta va a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
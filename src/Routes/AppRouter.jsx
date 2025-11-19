import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout"; // Importar el nuevo Layout
import Profile from "../pages/Profile/Profile"; // Importar el futuro componente Profile

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ======== AUTENTICACIÓN (Rutas públicas) ======== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ======== RUTAS PROTEGIDAS ======== */}
        {/* Usamos Layout para envolver todas las rutas que requieren autenticación */}
        <Route
          element={
            <ProtectedRoute>
              <Layout /> {/* El Layout contendrá la Navbar y el Outlet para las rutas hijas */}
            </ProtectedRoute>
          }
        >
          {/* Rutas hijas que se renderizarán dentro del <Outlet> de Layout */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} /> {/* Alias para /home */}
          <Route path="/profile" element={<Profile />} /> {/* Nueva ruta para el perfil */}
          {/* Aquí irían otras rutas protegidas como /dashboard, etc. */}
        </Route>

        {/* ======== RUTA 404 - Redirige a la página principal si está autenticado, o a login si no ======== */}
        {/* Esta ruta debe ir al final */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute";
// import Dashboard from "../pages/Dashboard/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LANDING PÚBLICA*/}
        <Route path="/" element={<Home />} />

        {/* Alias opcional /home */}
        <Route path="/home" element={<Navigate to="/" />} />

        {/* ======== AUTENTICACIÓN ======== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ======== RUTAS PROTEGIDAS (cuando las crees) ======== */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}

        {/* ======== RUTA 404 ======== */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

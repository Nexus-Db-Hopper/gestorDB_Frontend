import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout";
import Profile from "../pages/Profile/Profile";

//import Dashboard from "../pages/Dashboard/Dashboard";

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
         
        </Route>
        {/** */}

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

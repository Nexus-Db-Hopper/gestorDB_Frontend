import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout";
import Profile from "../pages/Profile/Profile";

import Dashboard from "../pages/Dashboard/Dashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import QueryEditor from "../pages/Dashboard/QueryEditor";
import DataManager from "../pages/Dashboard/DataManager";

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
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<UserDashboard />} />
            <Route path="editor" element={<QueryEditor />} />
            <Route path="data" element={<DataManager />} />
          </Route>

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

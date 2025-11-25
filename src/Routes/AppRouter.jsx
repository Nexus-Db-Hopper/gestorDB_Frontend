import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

// import Layout from "../components/Layout/Layout"; // This general layout will no longer be used for user dashboard
import Profile from "../pages/Profile/Profile";

import AdminDashboardLayout from "../pages/Dashboard/AdminDashboard/AdminDashboardLayout";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import AssignInstances from "../pages/Dashboard/AdminDashboard/AssignInstances";
import Logs from "../pages/Dashboard/AdminDashboard/Logs";
import Users from "../pages/Dashboard/AdminDashboard/Users"

import UserDashboardLayout from "../pages/Dashboard/UserDashboard/UserDashboardLayout"; // New User Layout
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard"; // This will be the Query Editor content
import Unauthorized from "../components/Unauthorized";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas User con layout propio (UserDashboardLayout) */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute role="User">
                <UserDashboardLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} /> {/* Main user content (Query Editor) */}
          <Route path="profile" element={<Profile />} /> {/* User Profile page */}
          {/* Add other user-specific routes here if needed */}
        </Route>

        {/* Rutas protegidas Admin con layout propio */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute role="Admin">
                <AdminDashboardLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
         
          <Route path="AssignInstances" element={<AssignInstances />} />
          <Route path="logs" element={<Logs />} />
          <Route path="Users" element={<Users/>}/>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

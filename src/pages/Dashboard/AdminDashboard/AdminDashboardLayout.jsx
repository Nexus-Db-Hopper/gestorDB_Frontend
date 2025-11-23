import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import "./AdminDashboard.css";
import AssignInstances from "./AssignInstances";

export default function AdminDashboardLayout() {
  return (
    <div className="adm-layout-container">
      <AdminSidebar />

      <main className="adm-layout-content">
        <Outlet /> {/* Aquí se renderizan AdminDashboard, Instances, Logs, etc */}
       
        
        
      </main>
    </div>
  );
}

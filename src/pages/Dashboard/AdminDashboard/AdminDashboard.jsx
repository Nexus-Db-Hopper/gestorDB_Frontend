import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboardLayout() {
  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <Outlet />
        <h1>Summary</h1>
      </main>
    </div>
  );
}

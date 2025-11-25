import UserSidebar from "../../../components/UserSidebar/UserSidebar";
import { Outlet } from "react-router-dom";
import "./Styles/UserDashboardLayout.css"; // New CSS for user layout

export default function UserDashboardLayout() {
  return (
    <div className="user-layout">
      <UserSidebar />

      <main className="user-main">
        <header className="user-header">
          <h1 className="user-title">User Dashboard</h1>
          <p className="user-subtitle">Manage your database instance</p>
        </header>
        
        {/* The Outlet will render the specific user dashboard content (e.g., QueryEditor, Profile) */}
        <Outlet />
      </main>
    </div>
  );
}

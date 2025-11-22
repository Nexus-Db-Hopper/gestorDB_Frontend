import { Outlet, Link } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>NexusDB - Admin</h2>
        <ul>
          <li><Link to="/dashboard/admin">Inicio</Link></li>
          <li><Link to="/dashboard/admin/users">Usuarios</Link></li>
          <li><Link to="/dashboard/admin/settings">Configuración</Link></li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <Outlet /> {/* Aquí se renderizará AdminDashboard u otras rutas hijas */}
      </main>
    </div>
  );
}

import { Link, Outlet } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>NexusDB</h2>
        <ul>
          <li><Link to="/dashboard">Inicio</Link></li>
          <li><Link to="/dashboard/editor">Query Editor</Link></li>
          <li><Link to="/dashboard/data">Data Manager</Link></li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

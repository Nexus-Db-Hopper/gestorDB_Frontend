import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import "./Styles/AdminDashboardLayout.css";

export default function AdminDashboardLayout() {
  return (
    <div className="adm-layout">
      <AdminSidebar />

      <main className="adm-main">
        <header className="adm-header">
          <h1 className="adm-title">Administrative Panel</h1>
          <p className="adm-subtitle">System status overview</p>
        </header>

        {/* Sección de tarjetas de resumen */}
        <section className="adm-cards">
          <div className="adm-card">
            <h3>Active Instances</h3>
            <p className="adm-number">12</p>
          </div>

          <div className="adm-card">
            <h3>Assigned Students</h3>
            <p className="adm-number">48</p>
          </div>

          <div className="adm-card">
            <h3>Engines Stopped</h3>
            <p className="adm-number">3</p>
          </div>

          <div className="adm-card">
            <h3>Logs under review</h3>
            <p className="adm-number">7</p>
          </div>
        </section>

        <Outlet />
      </main>
    </div>
  );
}

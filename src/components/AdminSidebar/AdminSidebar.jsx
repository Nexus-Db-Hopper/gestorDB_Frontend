import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { useState } from "react";
import { logoutUser } from "../../services/authservice";

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("¡Uy! Hubo un problema al cerrar sesión. Intenta de nuevo, parcero.");
      navigate("/login");
    }
  };

  return (
    <>
      {/* Responsive móvil */}
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="adm-brand">
    <img src="/public/blackhole.png" alt="logo" className="adm-logo" />
    <h2 className="titleA">Nexus DB</h2>
  </div>
        <ul className="list">

          <li>
  <Link to="/dashboard/admin">
    <i className="pi pi-home"></i>
    <span>Home</span>
  </Link>
</li>

<li>
  <Link to="/dashboard/admin/AssignInstances">
    <i className="pi pi-database"></i>
    <span>Instances</span>
  </Link>
</li>

<li>
  <Link to="/dashboard/admin/logs">
    <i className="pi pi-history"></i>
    <span>Logs</span>
  </Link>
</li>

<li>
  <Link to="/dashboard/admin/Users">
    <i className="pi pi-users"></i>
    <span>Users</span>
  </Link>
</li>

        </ul>

        <div className="logout-container">
          <button onClick={handleLogout} className="logout-button">
            <i className="pi pi-sign-out"></i> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

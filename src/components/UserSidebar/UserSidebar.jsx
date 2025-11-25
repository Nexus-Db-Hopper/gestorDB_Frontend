import { Link, useNavigate } from "react-router-dom";
import "./UserSidebar.css";
import { useState } from "react";
import { logoutUser } from "../../services/authservice";

export default function UserSidebar() {
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
        <div className="user-brand">
          <img src="/public/blackhole.png" alt="logo" className="user-logo" />
          <h2 className="titleU">Nexus DB</h2>
        </div>
        <ul className="list">
          <li>
            <Link to="/dashboard/user">
              <i className="pi pi-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/user"> {/* Corrected: Points to the base user dashboard route */}
              <i className="pi pi-code"></i>
              <span>Query Editor</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/user/profile">
              <i className="pi pi-user"></i>
              <span>Profile</span>
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

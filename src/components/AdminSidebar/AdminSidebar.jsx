import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { useState } from "react";
import { logoutUser } from '../../services/authservice';

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      await logoutUser(); 
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("¡Uy! Hubo un problema al cerrar sesión. Intenta de nuevo, parcero.");
      navigate('/login');
    }
  };

  return (
    <>
      {/* responsive movil */}
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <h2 className="titleA">Nexus DB</h2>

        <ul className="list">
          <li><Link to="">Home</Link></li>
          <li><Link to="AssignInstances">Instances</Link></li>
          <li><Link to="logs">Logs</Link></li>
          <li><Link to="user">Users</Link></li>
        </ul>
        <div className="logout-container">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>

        
      </aside>
    </>
  );
}

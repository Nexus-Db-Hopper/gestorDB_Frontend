import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para verificar si estamos en la página actual
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nx-navbar">
      <div className="nx-logo" onClick={() => navigate("/")}>
        NexusDB
      </div>

      {/* Mostrar About Us solo si no estamos en Login o Register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <ul className="nx-nav-links">
          {/* Usamos un ancla href="#about-us" para navegar a la sección */}
          <li>
            <a href="#about-us" className={isActive("/#about-us") ? "active" : ""}>
              About Us
            </a>
          </li>
        </ul>
      )}

      <div className="nx-nav-right">
        {location.pathname !== "/login" && location.pathname !== "/register" && (
          <>
            <button
              className={`nx-btn-nav ${isActive("/login") ? "active" : ""}`}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className={`nx-btn-nav ${isActive("/register") ? "active" : ""}`}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
       
      </div>
    </nav>
  );
}

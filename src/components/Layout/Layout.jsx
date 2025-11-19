import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authservice';
import './Layout.css';

function Layout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            await logoutUser(); // Call API logout if needed
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("¡Uy! Hubo un problema al cerrar sesión. Intenta de nuevo, parcero.");
            navigate('/login');
        }
    };

    return (
        <div className="layout-container">
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/">GestorDB</Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/profile">Mi Perfil</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
                    </li>
                </ul>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;

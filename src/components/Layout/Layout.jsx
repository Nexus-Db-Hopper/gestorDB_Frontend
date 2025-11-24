import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authservice';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

function Layout() {
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
        <div className="layout-wrapper">
            {/* Sidebar izquierdo */}
            <Sidebar />

            {/* Contenedor principal con header y contenido */}
            <div className="layout-main">
                {/* Header superior */}
                <header className="layout-header">
                    <div className="header-brand">
                        <span>Nexus DB</span>
                    </div>
                    <nav className="header-nav">
                        <button onClick={handleLogout} className="logout-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            Cerrar Sesión
                        </button>
                    </nav>
                </header>

                {/* Contenido principal */}
                <main className="layout-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
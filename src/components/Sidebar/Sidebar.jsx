import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Necesitamos jwt-decode para leer el token
import './Sidebar.css';

function Sidebar() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Asumiendo que el rol está en un claim llamado 'role' o 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decodedToken.role;
        setUserRole(role);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-brand">Nexus DB</h2>
      </div>
      
      <nav className="sidebar-nav">
        {userRole === 'Admin' && (
          <>
            <NavLink 
              to="/dashboard/admin" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              end
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>Dashboard Admin</span>
            </NavLink>
            <NavLink 
              to="/dashboard/admin/AssignInstances" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>Assign Instances</span>
            </NavLink>
            <NavLink 
              to="/dashboard/admin/logs" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <span>Logs</span>
            </NavLink>
            <NavLink 
              to="/dashboard/admin/user" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <polyline points="17 11 19 13 23 9"/>
              </svg>
              <span>Users</span>
            </NavLink>
          </>
        )}

        {userRole === 'User' && (
          <>
            <NavLink 
              to="/dashboard/user" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              end
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
              <span>My Database</span>
            </NavLink>
          </>
        )}

        {/* Enlaces comunes para ambos roles o para cualquier usuario logueado */}
        {userRole && ( // Solo mostrar si hay un rol (usuario logueado)
          <>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Profile</span>
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m5.66-13a9.94 9.94 0 0 1 0 14M6.34 6a9.94 9.94 0 0 0 0 14"/>
              </svg>
              <span>Settings</span>
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
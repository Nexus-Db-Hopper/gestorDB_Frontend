import React from 'react';
import Card from '../Card/Card';
import './DatabaseInfo.css';

const mockDbInfo = {
  "1": {
    name: "MySQL Principal",
    type: "MySQL 8.0.32",
    host: "localhost:3306",
    database: "estudiantes_db",
    user: "estudiante_01",
    uptime: "2d 14h 32m",
    tables: 12,
    size: "245 MB",
  },
};

/**
 * Componente que muestra información de la base de datos
 * @param {object} props - Propiedades del componente
 * @param {string} props.dbId - ID de la base de datos a mostrar
 */
export const DatabaseInfo = ({ dbId }) => {
  const info = mockDbInfo[dbId];

  if (!info) return null;

  return (
    <div className="database-info">
      <div className="database-header">
        <h2 className="database-title">{info.name}</h2>
        <p className="database-type">{info.type}</p>
      </div>

      <div className="database-stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon host">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div>
              <p className="stat-label">Host</p>
              <p className="stat-value">{info.host}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon database">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
            <div>
              <p className="stat-label">Base de Datos</p>
              <p className="stat-value">{info.database}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon size">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                <line x1="6" y1="6" x2="6.01" y2="6"/>
                <line x1="6" y1="18" x2="6.01" y2="18"/>
              </svg>
            </div>
            <div>
              <p className="stat-label">Tamaño</p>
              <p className="stat-value">{info.size}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon uptime">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <p className="stat-label">Uptime</p>
              <p className="stat-value">{info.uptime}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="database-details">
        <h3 className="details-title">Detalles de Conexión</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Usuario:</span>
            <span className="detail-value">{info.user}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Tablas:</span>
            <span className="detail-value">{info.tables}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DatabaseInfo;
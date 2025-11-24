import React from 'react';
import Card from '../Card/Card';
import './DatabaseInfo.css';

/**
 * Componente que muestra información de la base de datos lógica del usuario.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.instance - El objeto de la instancia que viene del backend.
 */
export const DatabaseInfo = ({ instance }) => {
  if (!instance) {
    return null;
  }

  // Alineado con la respuesta final del backend: dbName y dbUser.
  const info = {
    dbName: instance.dbName || 'N/A',
    dbUser: instance.dbUser || 'N/A',
    host: 'MySQL Server (UPS)', 
  };

  return (
    <div className="database-info">
      <div className="database-header">
        <h2 className="database-title">Your Database Details</h2>
        <p className="database-type">{info.host}</p>
      </div>

      <div className="database-stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon database">
              {/* Icono SVG */}
            </div>
            <div>
              <p className="stat-label">Database Name</p>
              <p className="stat-value">{info.dbName}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon user">
              {/* Icono SVG */}
            </div>
            <div>
              <p className="stat-label">Database User</p>
              <p className="stat-value">{info.dbUser}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseInfo;

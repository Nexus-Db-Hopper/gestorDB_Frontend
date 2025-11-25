import React from 'react';
import Card from '../Card/Card';
import './DatabaseInfo.css';

/**
 * Componente que muestra información de la base de datos lógica del usuario.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.instance - El objeto de la instancia que viene del backend.
 * // Removed onStartInstance, onStopInstance, isActionLoading props
 */
export const DatabaseInfo = ({ instance }) => { // Removed onStartInstance, onStopInstance, isActionLoading from destructuring
  if (!instance) {
    return null;
  }

  const info = {
    dbName: instance.dbName || 'N/A',
    dbUser: instance.dbUser || 'N/A',
    host: 'MySQL Server (UPS)', 
    isActive: instance.isActive, // Still display status
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

        {/* Card for Instance Status (without action buttons) */}
        <Card className="stat-card status-card">
          <div className="stat-content">
            <div className="stat-icon status">
              <i className={`pi ${info.isActive ? 'pi-check-circle active' : 'pi-times-circle inactive'}`}></i>
            </div>
            <div>
              <p className="stat-label">Status</p>
              <p className={`stat-value ${info.isActive ? 'active' : 'inactive'}`}>
                {info.isActive ? 'Running' : 'Stopped'}
              </p>
            </div>
          </div>
          {/* Removed instance-actions div and buttons */}
        </Card>
      </div>
    </div>
  );
};

export default DatabaseInfo;

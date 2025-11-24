import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Switch from '../../components/Switch/Switch';
import Select from '../../components/Select/Select';
import Separator from '../../components/Separator/Separator';
import { toast } from 'sonner';
import './Settings.css';

const Settings = () => {
  // Estado de todas las configuraciones
  const [config, setConfig] = useState({
    // Preferencias de Visualización
    lineNumbers: true,
    syntaxHighlight: true,
    autoComplete: true,
    
    // Configuración de Base de Datos
    defaultLimit: "100",
    autoRefresh: false,
    confirmDelete: true,
    
    // Notificaciones
    queryNotifications: true,
    errorNotifications: true,
    
    // Exportación de Datos
    exportFormat: "csv"
  });

  // Cargar configuración desde localStorage al montar
  useEffect(() => {
    const savedConfig = localStorage.getItem('userSettings');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Error al cargar configuración:', error);
      }
    }
  }, []);

  // Manejar cambios en toggles
  const handleToggle = (key) => {
    setConfig(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Manejar cambios en selects
  const handleSelectChange = (e, key) => {
    setConfig(prev => ({
      ...prev,
      [key]: e.target.value
    }));
  };

  // Guardar configuración
  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(config));
    localStorage.setItem('exportFormat', config.exportFormat); // Para QueryEditor
    toast.success('Configuración guardada correctamente');
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">Configuración</h1>
        <p className="settings-subtitle">Personaliza tu experiencia en la plataforma</p>
      </div>

      <Card className="settings-card">
        <div className="settings-content">
          
          {/* Preferencias de Visualización */}
          <div className="settings-section">
            <h3 className="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Preferencias de Visualización
            </h3>
            
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">Números de línea en editor</label>
                <p className="setting-description">Muestra números de línea en el editor de consultas</p>
              </div>
              <Switch 
                id="lineNumbers"
                checked={config.lineNumbers}
                onChange={() => handleToggle('lineNumbers')}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">Resaltado de sintaxis</label>
                <p className="setting-description">Activa el resaltado de sintaxis SQL</p>
              </div>
              <Switch 
                id="syntaxHighlight"
                checked={config.syntaxHighlight}
                onChange={() => handleToggle('syntaxHighlight')}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">Autocompletado</label>
                <p className="setting-description">Sugerencias automáticas mientras escribes</p>
              </div>
              <Switch 
                id="autoComplete"
                checked={config.autoComplete}
                onChange={() => handleToggle('autoComplete')}
              />
            </div>
          </div>

          <Separator />

          {/* Configuración de Base de Datos */}
          <div className="settings-section">
            <h3 className="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
              Configuración de Base de Datos
            </h3>

            <div className="setting-item">
              <Select
                id="defaultLimit"
                label="Límite de filas por defecto"
                value={config.defaultLimit}
                onChange={(e) => handleSelectChange(e, 'defaultLimit')}
                options={[
                  { value: "10", label: "10 filas" },
                  { value: "50", label: "50 filas" },
                  { value: "100", label: "100 filas" },
                  { value: "500", label: "500 filas" }
                ]}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">Actualización automática</label>
                <p className="setting-description">Refresca los datos automáticamente cada 30 segundos</p>
              </div>
              <Switch 
                id="autoRefresh"
                checked={config.autoRefresh}
                onChange={() => handleToggle('autoRefresh')}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">Confirmar eliminaciones</label>
                <p className="setting-description">Solicitar confirmación antes de eliminar registros</p>
              </div>
              <Switch 
                id="confirmDelete"
                checked={config.confirmDelete}
                onChange={() => handleToggle('confirmDelete')}
              />
            </div>
          </div>

          <Separator />

          {/* Notificaciones */}
          <div className="settings-section">
            <h3 className="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              Notificaciones
            </h3>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">Notificaciones de consultas</label>
                <p className="setting-description">Recibe alertas cuando tus consultas se completen</p>
              </div>
              <Switch 
                id="queryNotifications"
                checked={config.queryNotifications}
                onChange={() => handleToggle('queryNotifications')}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">Notificaciones de errores</label>
                <p className="setting-description">Alerta cuando ocurran errores en tus consultas</p>
              </div>
              <Switch 
                id="errorNotifications"
                checked={config.errorNotifications}
                onChange={() => handleToggle('errorNotifications')}
              />
            </div>
          </div>

          <Separator />

          {/* Exportación de Datos */}
          <div className="settings-section">
            <h3 className="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Exportación de Datos
            </h3>

            <div className="setting-item">
              <Select
                id="exportFormat"
                label="Formato de exportación predeterminado"
                value={config.exportFormat}
                onChange={(e) => handleSelectChange(e, 'exportFormat')}
                options={[
                  { value: "csv", label: "CSV" },
                  { value: "json", label: "JSON" },
                  { value: "sql", label: "SQL" },
                  { value: "xlsx", label: "Excel (XLSX)" }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="settings-actions">
          <Button variant="primary" onClick={handleSave}>
            Guardar Configuración
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
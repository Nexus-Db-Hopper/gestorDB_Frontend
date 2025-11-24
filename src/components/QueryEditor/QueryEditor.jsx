import React, { useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Textarea from '../Textarea/Textarea';
import { toast } from 'sonner';
import './QueryEditor.css';

/**
 * Componente editor de consultas SQL
 */
export const QueryEditor = () => {
  const [query, setQuery] = useState("SELECT * FROM usuarios LIMIT 10;");
  const [result, setResult] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExecute = () => {
    toast.success("Consulta ejecutada correctamente");
    setResult({
      rows: 3,
      time: "0.023s",
      data: [
        { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
        { id: 2, nombre: "María García", email: "maria@example.com" },
        { id: 3, nombre: "Carlos López", email: "carlos@example.com" },
      ],
    });
  };

  const handleClear = () => {
    setQuery("");
    setResult(null);
  };

  const handleExport = () => {
    if (!query.trim()) {
      toast.error("Escribe una consulta SQL para exportar");
      return;
    }

    setIsExporting(true);
    
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Datos exportados en formato CSV");
    }, 1000);
  };

  return (
    <div className="query-editor-container">
      <Card className="query-editor-card">
        <div className="query-editor-header">
          <h3 className="query-editor-title">Editor de Consultas</h3>
          <div className="query-editor-actions">
            <Button variant="secondary" onClick={handleClear}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Limpiar
            </Button>
            <Button variant="secondary" onClick={handleExport} disabled={isExporting}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {isExporting ? "Exportando..." : "Exportar"}
            </Button>
            <Button variant="primary" onClick={handleExecute}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Ejecutar
            </Button>
          </div>
        </div>
        <Textarea
          id="sql-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe tu consulta SQL aquí..."
          rows={6}
          className="query-textarea"
        />
      </Card>

      {result && (
        <Card className="query-results-card">
          <div className="query-results-header">
            <h3 className="query-results-title">Resultados</h3>
            <p className="query-results-info">
              {result.rows} filas en {result.time}
            </p>
          </div>
          <div className="query-results-table-wrapper">
            <table className="query-results-table">
              <thead>
                <tr>
                  {Object.keys(result.data[0] || {}).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.data.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value, j) => (
                      <td key={j}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default QueryEditor;
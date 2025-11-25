import React, { useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Textarea from '../Textarea/Textarea';
import { toast } from 'sonner';
import './QueryEditor.css';

/**
 * Componente editor de consultas SQL.
 * Es un componente "tonto" que recibe una función para ejecutar la consulta.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onQuerySubmit - Función a la que se llama para ejecutar la consulta.
 */
export const QueryEditor = ({ onQuerySubmit }) => {
  const [query, setQuery] = useState("SELECT * FROM information_schema.tables;");
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    if (!query.trim()) {
      toast.error("Cannot execute an empty query.");
      return;
    }
    setLoading(true);
    // Llama a la función que le pasó el componente padre (UserDashboard)
    if (onQuerySubmit) {
      await onQuerySubmit(query);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="query-editor-container">
      <Card className="query-editor-card">
        <div className="query-editor-header">
          <h3 className="query-editor-title">Query Editor</h3>
          <div className="query-editor-actions">
            <Button variant="secondary" onClick={handleClear}>
              {/* Icono Limpiar */}
              Clear
            </Button>
            <Button variant="primary" onClick={handleExecute} disabled={loading}>
              {/* Icono Ejecutar */}
              {loading ? "Executing..." : "Execute"}
            </Button>
          </div>
        </div>
        <Textarea
          id="sql-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          rows={8}
          className="query-textarea"
        />
      </Card>
    </div>
  );
};

export default QueryEditor;

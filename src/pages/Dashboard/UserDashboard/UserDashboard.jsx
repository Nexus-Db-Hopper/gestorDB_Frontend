import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { getMyInstance, queryInstance } from '../../../services/instanceservice'; // Removed startInstance and stopInstance
import DatabaseInfo from '../../../components/DatabaseInfo/DatabaseInfo';
import QueryEditor from '../../../components/QueryEditor/QueryEditor';
import DataTable from '../../../components/DataTable/DataTable';
import './UserDashboard.css';

/**
 * Dashboard principal del usuario
 * Componente "inteligente" que gestiona el estado de la instancia y las consultas.
 */
const UserDashboard = () => {
  const [instance, setInstance] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Removed const [isInstanceActionLoading, setIsInstanceActionLoading] = useState(false);

  // Efecto para obtener la instancia del usuario al cargar el componente
  useEffect(() => {
    const fetchInstance = async () => {
      try {
        setLoading(true);
        const myInstance = await getMyInstance();
        setInstance(myInstance);
        setError(null);
      } catch (err) {
        console.error("Error fetching user instance:", err);
        setError("Could not load your database instance. Please contact support.");
        toast.error("Could not load your database instance.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstance();
  }, []);

  // Función para manejar la ejecución de consultas desde el QueryEditor
  const handleQuerySubmit = async (query) => {
    if (!instance) {
      toast.error("Database instance is not available.");
      return;
    }

    try {
      const response = await queryInstance({ query, engine: instance.engine });
      if (response && response.success && Array.isArray(response.data)) {
        setQueryResult(response.data);
      } else if (response && response.error) {
        setQueryResult({ error: response.error });
      } else {
        setQueryResult([]); 
      }
      toast.success("Query executed successfully!");
    } catch (err) {
      console.error("Error executing query:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to execute query.";
      setQueryResult({ error: errorMessage });
      toast.error(errorMessage);
    }
  };

  // Removed handleStartInstance and handleStopInstance functions

  if (loading) {
    return <div className="user-dashboard-info-message">Loading your instance...</div>;
  }

  if (error) {
    return <div className="user-dashboard-info-message error">{error}</div>;
  }

  if (!instance) {
    return <div className="user-dashboard-info-message">No instance assigned to you. Please contact your administrator.</div>;
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="user-dashboard-content">
        {/* Pasa la información real de la instancia. Removed action props */}
        <DatabaseInfo 
          instance={instance} 
          // Removed onStartInstance={handleStartInstance}
          // Removed onStopInstance={handleStopInstance}
          // Removed isActionLoading={isInstanceActionLoading}
        />
        
        {/* Editor de Consultas */}
        <QueryEditor onQuerySubmit={handleQuerySubmit} />

        {/* Resultados de la Consulta */}
        <div className="query-results-section">
          <h3 className="results-title">Query Result</h3>
          <DataTable data={queryResult} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

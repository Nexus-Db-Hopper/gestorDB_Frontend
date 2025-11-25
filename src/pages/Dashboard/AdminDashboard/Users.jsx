import { useEffect, useState } from "react";
import { getAllInstances, startInstance, stopInstance } from "../../../services/instanceservice";
import { toast } from 'sonner';
import "./AdminDashboard.css";

export default function Users() {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInstanceActionLoading, setIsInstanceActionLoading] = useState(false);

  const fetchAllInstances = async () => {
    try {
      setLoading(true);
      const fetchedInstances = await getAllInstances();
      setInstances(fetchedInstances);
      setError(null);
    } catch (err) {
      console.error("Error loading instances:", err);
      setError("Could not load instances. Please try again.");
      toast.error("Could not load instances.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInstances();
  }, []);

  const handleStartInstance = async (instanceId) => {
    if (isInstanceActionLoading) return;

    setIsInstanceActionLoading(true);
    try {
      await startInstance(instanceId);
      setInstances(prevInstances => 
        prevInstances.map(inst => inst.id === instanceId ? { ...inst, isActive: true } : inst)
      );
      toast.success(`Instance ${instanceId} started successfully!`);
    } catch (err) {
      console.error("Error starting instance:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to start instance.");
    } finally {
      setIsInstanceActionLoading(false);
    }
  };

  const handleStopInstance = async (instanceId) => {
    if (isInstanceActionLoading) return;

    setIsInstanceActionLoading(true);
    try {
      await stopInstance(instanceId);
      setInstances(prevInstances => 
        prevInstances.map(inst => inst.id === instanceId ? { ...inst, isActive: false } : inst)
      );
      toast.success(`Instance ${instanceId} stopped successfully!`);
    } catch (err) {
      console.error("Error stopping instance:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to stop instance.");
    } finally {
      setIsInstanceActionLoading(false);
    }
  };

  if (loading) {
    return <div className="adm-info-message">Loading instances...</div>;
  }

  if (error) {
    return <div className="adm-info-message error">{error}</div>;
  }

  return (
    <div className="adm-content">
      <h1 className="adm-title">Manage Instances</h1>

      {instances.length === 0 ? (
        <p className="adm-info-message">No instances found.</p>
      ) : (
        <ul className="instance-list">
          {instances.map(instance => (
            <li key={instance.id} className="instance-item">
              <div className="instance-header-admin">
                <h3 className="instance-name-admin">{instance.name}</h3>
                <span className={`instance-status ${instance.isActive ? 'active' : 'inactive'}`}>
                  {instance.isActive ? 'Running' : 'Stopped'}
                </span>
              </div>

              <div className="instance-details-admin">
                <p><strong>ID:</strong> {instance.id}</p>
                <p><strong>Owner:</strong> {instance.ownerUserName || "Unknown"} (ID: {instance.ownerUserId})</p>
                <p><strong>Engine:</strong> {instance.engine}</p>
              </div>

              <div className="instance-characteristics-admin">
                <h4>Database Characteristics</h4>
                <p>Version: {instance.dbVersion || 'N/A'}</p>
                <p>Size: {instance.dbSize || 'N/A'}</p>
                <p>Connections: {instance.dbConnections || 'N/A'}</p>
              </div>

              <div className="instance-logs-admin">
                <h4>Latest Logs</h4>
                <p>Log 1: {instance.latestLog1 || 'No recent logs'}</p>
                <p>Log 2: {instance.latestLog2 || ''}</p>
              </div>

              <div className="instance-actions-admin">
                <button 
                  onClick={() => handleStartInstance(instance.id)} 
                  disabled={instance.isActive || isInstanceActionLoading} 
                  className="adm-action-button start-button"
                >
                  <i className="pi pi-play"></i> {isInstanceActionLoading && !instance.isActive ? 'Starting...' : 'Start'}
                </button>
                <button 
                  onClick={() => handleStopInstance(instance.id)} 
                  disabled={!instance.isActive || isInstanceActionLoading} 
                  className="adm-action-button stop-button"
                >
                  <i className="pi pi-stop"></i> {isInstanceActionLoading && instance.isActive ? 'Stopping...' : 'Stop'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

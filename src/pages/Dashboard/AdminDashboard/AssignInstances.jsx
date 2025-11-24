import { useState } from "react";
import { createInstance } from "../../../services/instanceservice";
import { jwtDecode } from "jwt-decode";
import "./AdminDashboard.css";

export default function AssignInstances() {
  const [formData, setFormData] = useState({
    engine: "mysql", // Valor por defecto para el motor
    name: "", // Nombre de la base de datos
    username: "", // Usuario de MySQL
    userPassword: "", // Contraseña para el usuario de MySQL
    ownerUserId: "", // ID del usuario de la aplicación
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Validaciones básicas
      if (!formData.engine || !formData.name || !formData.username || !formData.userPassword || !formData.ownerUserId) {
        setError("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }
      
      const decodedToken = jwtDecode(token);
      const adminId = decodedToken.nameid; 
      if (!adminId) {
        throw new Error("Could not identify the administrator from the token.");
      }

      const dataToSend = {
        ...formData,
        ownerUserId: Number(formData.ownerUserId),
        createdByUserId: Number(adminId),
        containerName: "N/A", // Este campo ya no es relevante para el backend
      };

      await createInstance(dataToSend);

      setMessage("Database created and assigned successfully!");
      setFormData({
        engine: "mysql", // Resetear a valor por defecto
        name: "",
        username: "",
        userPassword: "",
        ownerUserId: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to create database.");
    }

    setLoading(false);
  };

  return (
    <div className="adm-content">
      <div className="log-card">
        <h1 className="log-title">Assign New Database</h1>
        <p className="log-subtitle">Create a new database instance for a student.</p>

        <form className="log-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="log-label">Database Engine</label>
            <select className="log-input" name="engine" value={formData.engine} onChange={handleChange} required>
              <option value="mysql">MySQL</option>
              <option value="postgresql">PostgreSQL</option>
              {/* Añadir más opciones de motores de DB aquí si el backend los soporta */}
            </select>
          </div>
          <div className="form-group">
            <label className="log-label">Database Name</label>
            <input className="log-input" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g., student_project_db" />
          </div>
          <div className="form-group">
            <label className="log-label">Database Username</label>
            <input className="log-input" type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="e.g., student_user_01" />
          </div>
          <div className="form-group">
            <label className="log-label">Database Password</label>
            <input className="log-input" type="password" name="userPassword" value={formData.userPassword} onChange={handleChange} required placeholder="e.g., StrongP@ssw0rd!" />
          </div>
          <div className="form-group">
            <label className="log-label">Student ID (Owner)</label>
            <input className="log-input" type="number" name="ownerUserId" value={formData.ownerUserId} onChange={handleChange} required placeholder="e.g., 123 (ID of the student user)" />
          </div>

          <button type="submit" className="log-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Database"}
          </button>

          {message && <p className="log-success">{message}</p>}
          {error && <p className="log-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { createInstance } from "../../../services/instanceservice"; 
import "./AdminDashboard.css";

export default function AssignInstances() {
  const [formData, setFormData] = useState({
    engine: "",
    name: "",
    username: "",
    userPassword: "",
    ownerUserId: "",
    createdByUserId: "",
    containerName: ""
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
      const token = localStorage.getItem("token"); 
      await createInstance({
        ...formData,
        ownerUserId: Number(formData.ownerUserId),
        createdByUserId: Number(formData.createdByUserId),
        token, // optional
      });

      setMessage("Instance created successfully ");
      setFormData({
        engine: "",
        name: "",
        username: "",
        userPassword: "",
        ownerUserId: "",
        createdByUserId: "",
        containerName: ""
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create instance ");
    }

    setLoading(false);
  };

  return (
    <div className="adm-content">
      <div className="log-card">
        <h1 className="log-title">Assign Instances</h1>

        <form className="log-form" onSubmit={handleSubmit}>
          {[
            { label: "Engine", name: "engine", type: "text", placeholder: "e.g. mysql, postgres" },
            { label: "Instance Name", name: "name", type: "text", placeholder: "e.g. instance001" },
            { label: "Database Username", name: "username", type: "text", placeholder: "Username for DB" },
            { label: "User Password", name: "userPassword", type: "password", placeholder: "********" },
            { label: "Student ID", name: "ownerUserId", type: "number", placeholder: "Owner user ID" },
            { label: "Admin ID", name: "createdByUserId", type: "number", placeholder: "Admin ID" },
            { label: "Container Name", name: "containerName", type: "text", placeholder: "e.g. db_instance001" },
          ].map(field => (
            <div className="form-group" key={field.name}>
              <label className="log-label">{field.label}</label>
              <input
                className="log-input"
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <button type="submit" className="log-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Instance"}
          </button>

          {message && <p className="log-success">{message}</p>}
          {error && <p className="log-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

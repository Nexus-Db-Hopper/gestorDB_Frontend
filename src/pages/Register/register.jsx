import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authservice";
import "./register.css";

export default function Register() {
  const [form, setForm] = useState({
    Name: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!form.Name.trim()) return setError("Name is required.");
    if (!form.LastName.trim()) return setError("Last name is required.");
    if (!form.Email.trim()) return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(form.Email)) return setError("Invalid email format.");
    if (!form.Password.trim()) return setError("Password is required.");
    if (form.Password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.Password !== form.ConfirmPassword)
      return setError("Passwords do not match.");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const data = {
        Name: form.Name,
        LastName: form.LastName,
        Email: form.Email,
        Password: form.Password,
      };

      const response = await registerUser(data);

      if (response?.success) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Unexpected server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-card">
        <h2 className="reg-title">Create Account</h2>

        <form onSubmit={handleSubmit} className="reg-form">
          <label className="reg-label">Name</label>
          <input
            id="Name"
            type="text"
            placeholder="Your name"
            value={form.Name}
            onChange={handleChange}
            className="reg-input"
          />

          <label className="reg-label">Last Name</label>
          <input
            id="LastName"
            type="text"
            placeholder="Your last name"
            value={form.LastName}
            onChange={handleChange}
            className="reg-input"
          />

          <label className="reg-label">Email</label>
          <input
            id="Email"
            type="email"
            placeholder="you@email.com"
            value={form.Email}
            onChange={handleChange}
            className="reg-input"
          />

          <label className="reg-label">Password</label>
          <input
            id="Password"
            type="password"
            placeholder="Minimum 6 characters"
            value={form.Password}
            onChange={handleChange}
            className="reg-input"
          />

          <label className="reg-label">Confirm Password</label>
          <input
            id="ConfirmPassword"
            type="password"
            placeholder="Repeat password"
            value={form.ConfirmPassword}
            onChange={handleChange}
            className="reg-input"
          />

          {error && <p className="reg-error">{error}</p>}
          {success && <p className="reg-success">{success}</p>}

          <button type="submit" className="reg-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="reg-link-text">
          Already have an account?{" "}
          <Link to="/login" className="reg-link">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

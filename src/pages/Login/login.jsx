import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authservice";
import "./login.css";
import Navbar from "../../components/Navbar/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(email))
      return setError("Invalid email format.");
    if (!password.trim()) return setError("Password is required.");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser({ email, password });

      if (response?.accessToken) {
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("refresh", response.refreshToken);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Unexpected server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="log-container">

      <Navbar currentPage="login" />

      <div className="log-card">
        <h2 className="log-title">Welcome Back</h2>

        <form onSubmit={handleLogin} className="log-form">
          <label className="log-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="log-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="log-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Your password"
            className="log-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="log-error">{error}</p>}

          <button type="submit" className="log-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="log-link-text">
          Don't have an account?{" "}
          <Link to="/register" className="log-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

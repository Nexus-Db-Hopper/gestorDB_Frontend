import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* BACKGROUND ANIMATED BLOBS */}
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <div className="bg-blob blob3"></div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">
            Manage Multiple Database Engines from a Single Platform.
          </h1>

          <p className="hero-subtitle">
            A modern platform inspired by MongoDB Atlas, Azure, and AWS RDS.
            Easily create, configure, and manage SQL and NoSQL instances.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button className="btn-secondary" onClick={() => navigate("/register")}>
              Create Account
            </button>
          </div>
        </div>

        <img
          src="/server-illust.png"
          alt="Database Illustration"
          className="hero-img"
        />
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2 className="features-title">What Does the Platform Offer?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3> SQL & NoSQL Instances</h3>
            <p>Create engines such as SQL Server, PostgreSQL, MySQL, MongoDB, and Redis.</p>
          </div>

          <div className="feature-card">
            <h3> Full Administration</h3>
            <p>Control ports, states, connections, and engine restarts.</p>
          </div>

          <div className="feature-card">
            <h3> Query Editor</h3>
            <p>Run SQL, MongoQL, or Redis CLI from a modern editor.</p>
          </div>

          <div className="feature-card">
            <h3> Real-Time Monitoring</h3>
            <p>View statistics, logs, and container activity.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Build Your Infrastructure in Minutes</h2>
        <button className="btn-primary" onClick={() => navigate("/register")}>
          Get Started
        </button>
      </section>

    </div>

    
  );
}

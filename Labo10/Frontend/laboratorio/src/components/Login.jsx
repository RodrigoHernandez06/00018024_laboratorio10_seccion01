import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/signin", { email, password });
      localStorage.setItem("token", response.data._jwt);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h2 className="login-title">Iniciar Sesión</h2>
          <p className="login-subtitle">Sistema de Gestión de Ventas</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-form-group">
            <label className="login-label">📧 Correo Electrónico</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
              disabled={loading}
            />
          </div>

          <div className="login-form-group">
            <label className="login-label">🔒 Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={`login-button ${loading ? 'disabled' : ''}`}
            disabled={loading}
          >
            {loading ? "⏳ Iniciando sesión..." : "🚀 Iniciar Sesión"}
          </button>

          {error && (
            <div className="login-error-message">
              ⚠️ {error}
            </div>
          )}
        </form>

        <div className="login-info-box">
          <h4 className="login-info-title">ℹ️ Información</h4>
          <p className="login-info-text">
            Para acceder al sistema necesitas una cuenta válida.
          </p>
          <div className="test-credentials">
            <p className="credentials-title">Credenciales de prueba:</p>
            <p className="credentials-text">
              <strong>Email:</strong> test@test.com<br/>
              <strong>Password:</strong> password
            </p>
          </div>
        </div>
      </div>

      <div className="login-features">
        <div className="login-feature">
          <div className="feature-icon">👥</div>
          <p className="feature-text">Gestión de Clientes</p>
        </div>
        <div className="login-feature">
          <div className="feature-icon">💰</div>
          <p className="feature-text">Control de Ventas</p>
        </div>
        <div className="login-feature">
          <div className="feature-icon">📊</div>
          <p className="feature-text">Reportes Detallados</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
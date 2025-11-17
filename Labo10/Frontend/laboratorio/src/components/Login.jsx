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
          <h2 className="login-title">Iniciar Sesión</h2>
          <p className="login-subtitle">Sistema de Gestión de Ventas</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-form-group">
            <label className="login-label">Correo Electrónico</label>
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
            <label className="login-label">Contraseña</label>
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
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          {error && (
            <div className="login-error-message">
               {error}
            </div>
          )}
        </form>
      </div>

    </div>
  );
};

export default Login;
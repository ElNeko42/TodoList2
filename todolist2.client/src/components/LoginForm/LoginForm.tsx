import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar el hook de navegación

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook de navegación

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://localhost:7039/api/auth/login", {
        username,
        password,
      });

      // Guardar el token en localStorage
      localStorage.setItem("token", res.data.Token);

      // Redirigir al ToDo List
      navigate("/todo");
    } catch (err: any) {
      setError(err.response?.data || "Error al iniciar sesión.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
        Iniciar Sesión
      </button>
    </div>
  );
};

export default LoginForm;

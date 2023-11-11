import React, { useState } from 'react';
import './LoginEstilo.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === 'Joaquin' && password === '12345') {
      alert('Inicio de sesión exitoso');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="password-container">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="show-password-button"
          onClick={() => setShowPassword(!showPassword)}
        >
          Mostrar Contraseña
        </button>
      </div>
      <button className="login-button" onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
}

export default Login;

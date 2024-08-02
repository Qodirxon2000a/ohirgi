import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; 

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validCredentials = [
      { username: 'admin', password: 'admin' },
      { username: 'Bahodir', password: 'Bahodir' },
      { username: 'Qodirxon', password: 'Qodirxon' },

    ];

    const isValid = validCredentials.some(
      (cred) => username === cred.username && password === cred.password

    );



    if (isValid) {
      setError('');
      setLoading(true);
      setTimeout(() => {
        navigate('/Crud');
      }, 1000);
    } else {
      setError('Hato Parol');
      setAttempts((prev) => prev + 1);
    }
  };

  return (
    <div className="background-image">
      {loading ? (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <div className="loading-message">YUKLANMOQDA...</div>
        </div>
      ) : (
        attempts < 3 ? (
          <div className="login__container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <p className="x">Juda ko'p urnish boldi . Keyinroq urnib ko'ring</p>
        )
      )}
    </div>
  );
};

export default Home;

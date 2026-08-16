import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('admin@yousearch.com');
  const [password, setPassword] = useState('pass@123');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin();
      navigate('/home');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-logo">
          <span className="brand-icon">▶</span> YOUSEARCH
        </h2>

        {/* Demo Credentials Box */}
        <div style={{
          backgroundColor: '#f1f5f9',
          border: '1px solid #cbd5e1',
          borderRadius: '6px',
          padding: '12px',
          marginBottom: '20px',
          textAlign: 'left',
          fontSize: '13px',
          color: '#334155'
        }}>
          <p style={{ margin: '0 0 6px 0', fontWeight: 'bold' }}>🔑 Demo Login Details:</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>User ID:</strong> admin@yousearch.com</p>
          <p style={{ margin: 0 }}><strong>Password:</strong> password123</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username / Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

function ProtectedLayout({ onLogout, children }) {
  return (
    <>
      <nav className="top-navbar">
        <Link to="/home" className="navbar-brand">
          <span className="brand-icon">▶</span>
          <span className="brand-text">YOUSEARCH</span>
        </Link>

        <div className="nav-actions">
          <Link to="/notes" className="nav-link">
            My Notes
          </Link>
          <button className="profile-btn" onClick={onLogout}>
            <span className="profile-icon">👤</span> Logout
          </button>
        </div>
      </nav>
      {children}
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <ProtectedLayout onLogout={handleLogout}>
                  <Home />
                </ProtectedLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
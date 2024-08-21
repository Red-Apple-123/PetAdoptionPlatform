import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email, 
          password: password 
        }),
        credentials: 'include', // Include credentials if needed
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);
        if (data.role === 'ROLE_USER') {
          navigate('/user-dashboard');
        } else if (data.role === 'ROLE_SHELTER') {
          navigate('/shelter-dashboard');
        } else if (data.role === 'ROLE_ADMIN') {
          navigate('/admin-dashboard');
        }
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff5e6', // Light orange background
    color: '#333', // Dark text color for readability
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    color: '#ff6600', // Orange color for heading
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ff6600',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: '#ff6600', // Orange button color
    color: '#fff', // White text color
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Login</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        style={inputStyle}
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        style={inputStyle}
      />
      <button 
        onClick={handleLogin} 
        style={buttonStyle}
      >
        Login
      </button>
    </div>
  );
};

export default Login;

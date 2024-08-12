import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/pet/auth/sign-in', { email, password });
      const { jwtToken, userRoles } = response.data;

      // Save token to local storage or context
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('roles', JSON.stringify(userRoles));

      // Navigate to the appropriate dashboard based on roles
      if (userRoles.includes('ROLE_ADMIN')) {
        navigate('/admin-dashboard');
      } else if (userRoles.includes('ROLE_SHELTER')) {
        navigate('/shelter-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

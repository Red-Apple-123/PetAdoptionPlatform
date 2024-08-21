import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_USER');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    
    if (role === 'ROLE_SHELTER') {
      formData.append('address', address);
      formData.append('contact', contact);
    }

    try {
      const response = await fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (response.ok) {
        navigate('/users/login');
      } else {
        alert('Signup failed');
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

  const selectStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ff6600',
    backgroundColor: '#fff',
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
      <h2 style={headingStyle}>Signup</h2>
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
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
        style={selectStyle}
      >
        <option value="ROLE_USER">User</option>
        <option value="ROLE_SHELTER">Shelter</option>
        <option value="ROLE_ADMIN">Admin</option>
      </select>
      
      {role === 'ROLE_SHELTER' && (
        <>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Address" 
            style={inputStyle}
          />
          <input 
            type="text" 
            value={contact} 
            onChange={(e) => setContact(e.target.value)} 
            placeholder="Contact" 
            style={inputStyle}
          />
        </>
      )}
      <button 
        onClick={handleSignup} 
        style={buttonStyle}
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;

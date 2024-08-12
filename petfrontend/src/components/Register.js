import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [userRoles, setUserRoles] = useState(['ROLE_USER']);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('profilePicture', profilePicture);
    userRoles.forEach((role) => formData.append('userRoles', role));

    try {
      await axios.post('http://localhost:8080/pet/register', formData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
      <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
      <label>
        <input type="checkbox" value="ROLE_SHELTER" onChange={(e) => setUserRoles([e.target.value])} />
        Shelter
      </label>
      <label>
        <input type="checkbox" value="ROLE_ADMIN" onChange={(e) => setUserRoles([e.target.value])} />
        Admin
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

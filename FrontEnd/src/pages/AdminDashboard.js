import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials if needed
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        navigate('/users/login');
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Shelter Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;

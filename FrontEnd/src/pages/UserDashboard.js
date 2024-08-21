import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css'; // Assuming you have a separate CSS file

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('role');
        navigate('/users/login');
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSeePets = () => {
    navigate('/pets/categories');
  };

  return (
    <div className="user-dashboard-container">
      <header className="header">
        <img src="path/to/logo.png" alt="Logo" className="header-logo" />
        <button className="header-button" onClick={handleLogout}>Logout</button>
      </header>
      <div className="sidebar">
        <button className="sidebar-button" onClick={handleSeePets}>See Pets</button>
        {/* Add more sidebar buttons here if needed */}
      </div>
      <main className="main-content">
        <h2>User Dashboard</h2>
      </main>
    </div>
  );
};

export default UserDashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShelterDashboard = () => {
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

  const handleUploadPet = () => {
    navigate('/upload-pet');
  };

  const handleViewPets = () => {
    navigate('/shelter-pets');
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: 0,
    padding: 0,
  };

  const headerStyle = {
    width: '100%',
    backgroundColor: '#FED800', // Orange background for header
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    boxSizing: 'border-box', // Ensure padding doesn't cause overflow
  };

  const sidebarStyle = {
    width: '200px',
    backgroundColor: '#FFFFFF', // yellow background for sidebar
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'fixed',
    top: '50px', // Adjust based on header height
    left: 0,
    bottom: 0,
    boxSizing: 'border-box',
    overflowY: 'auto',
  };

  const buttonStyle = {
    backgroundColor: '#fff',
    color: '#000',
    border: '2px solid #000', // Black border
    borderRadius: '5px',
    padding: '10px 15px',
    margin: '5px 0', // Increase margin to move buttons down
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const contentStyle = {
    marginLeft: '220px', // Adjust based on sidebar width
    padding: '20px',
    backgroundColor: '#FFFFE0', // Light orange background for content area
    flex: 1,
    transition: 'margin-left 0.3s ease',
    marginTop: '50px', // Adjust for header height
    boxSizing: 'border-box', // Ensure padding doesn't cause overflow
  };

  const logoStyle = {
    height: '40px',
    width: 'auto',
  };

  const logoSrc = 'path/to/logo.png'; // Replace with your logo path

  // Media query for responsive design
  const mediaQueryStyles = `
    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        position: static;
        top: auto;
        bottom: auto;
        flex-direction: row;
        overflow: hidden;
      }
      .sidebar button {
        flex: 1;
        margin: 5px;
      }
      .content {
        margin-left: 0;
        margin-top: 50px; // Ensure content is visible below the header
      }
    }
  `;

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <img src={logoSrc} alt="Logo" style={logoStyle} />
        <button 
          onClick={handleLogout} 
          style={{
            ...buttonStyle, 
            position: 'relative', 
            right: '0',
            top: '0',
            marginLeft: 'auto'
          }}
        >
          Logout
        </button>
      </header>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={sidebarStyle} className="sidebar">
          <button onClick={handleUploadPet} style={buttonStyle}>Upload Pet</button>
          <button onClick={handleViewPets} style={buttonStyle}>See All Pets</button>
        </div>
        <main style={contentStyle} className="content">
          <h2>Shelter Dashboard</h2>
        </main>
      </div>
      <style>{mediaQueryStyles}</style>
    </div>
  );
};

export default ShelterDashboard;

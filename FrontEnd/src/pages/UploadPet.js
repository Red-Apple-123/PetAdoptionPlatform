import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadPet = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [color, setColor] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('DOG'); 
  const [healthStatus, setHealthStatus] = useState('HEALTHY'); 
  const [petAdoptionStatus, setPetAdoptionStatus] = useState('AVAILABLE'); 
  const [petTrainStatus, setPetTrainStatus] = useState('UNTRAINED');
  const [petPic, setPetPic] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('species', species);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('color', color);
    formData.append('gender', gender);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('healthStatus', healthStatus);
    formData.append('petAdoptionStatus', petAdoptionStatus);
    formData.append('petTrainStatus', petTrainStatus);
    if (petPic) formData.append('petPic', petPic);

    try {
      const response = await fetch('http://localhost:8080/pets/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/shelter-dashboard');
      } else {
        alert('Failed to upload pet');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
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
    backgroundColor: '#4CBB17', // Header color
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
    boxSizing: 'border-box',
  };

  const sidebarStyle = {
    width: '200px',
    backgroundColor: '#fff', // White background for sidebar
    color: '#000',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'fixed',
    top: '50px',
    left: 0,
    bottom: 0,
    boxSizing: 'border-box',
    overflowY: 'auto',
  };

  const buttonStyle = {
    backgroundColor: '#fff',
    color: '#000',
    border: '2px solid #4CBB17',
    borderRadius: '20px',
    padding: '10px 20px',
    margin: '10px 0',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const buttonHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  };

  const contentStyle = {
    marginLeft: '220px',
    padding: '20px',
    backgroundColor: 'rgba(76, 187, 23, 0.38)', // Light green background with 38% opacity
    flex: 1,
    marginTop: '50px',
    boxSizing: 'border-box',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '500px', // Restricting form width
    margin: '0 auto', // Centering the form
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const textareaStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontSize: '16px',
    width: '100%',
    height: '100px',
    boxSizing: 'border-box',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const selectStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const logoStyle = {
    height: '40px',
    width: 'auto',
  };

  const logoSrc = 'path/to/logo.png'; // Replace with your logo path

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <img src={logoSrc} alt="Logo" style={logoStyle} />
      </header>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={sidebarStyle} className="sidebar">
          <button onClick={() => navigate('/shelter-dashboard')} style={buttonStyle}>Back to Dashboard</button>
        </div>
        <main style={contentStyle} className="content">
          <h2>Upload Pet</h2>
          <div style={formStyle}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={inputStyle} />
            <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="Species" style={inputStyle} />
            <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Breed" style={inputStyle} />
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" style={inputStyle} />
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" style={inputStyle} />
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" style={inputStyle} />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={textareaStyle}></textarea>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={selectStyle}>
              <option value="DOG">Dog</option>
              <option value="CAT">Cat</option>
            </select>
            <select value={healthStatus} onChange={(e) => setHealthStatus(e.target.value)} style={selectStyle}>
              <option value="HEALTHY">Healthy</option>
              <option value="INJURED">Injured</option>
              <option value="RECOVERING">Recovering</option>
              <option value="SICK">Sick</option>
            </select>
            <select value={petAdoptionStatus} onChange={(e) => setPetAdoptionStatus(e.target.value)} style={selectStyle}>
              <option value="AVAILABLE">Available</option>
              <option value="ADOPTED">Adopted</option>
            </select>
            <select value={petTrainStatus} onChange={(e) => setPetTrainStatus(e.target.value)} style={selectStyle}>
              <option value="UNTRAINED">Untrained</option>
              <option value="TRAINED">Trained</option>
              <option value="IN_TRAINING">In Training</option>
            </select>
            <input type="file" onChange={(e) => setPetPic(e.target.files[0])} style={inputStyle} />
            <button onClick={handleUpload} style={buttonStyle} onMouseOver={(e) => e.currentTarget.style = buttonHoverStyle} onMouseOut={(e) => e.currentTarget.style = buttonStyle}>
              Upload Pet
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadPet;

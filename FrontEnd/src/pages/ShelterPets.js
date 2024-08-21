import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './ShelterPets.css'; 

// Set the app element for react-modal
Modal.setAppElement('#root');

const ShelterPets = () => {
  const [pets, setPets] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:8080/pets/shelter-pets', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setPets(data);
        } else {
          console.error('Failed to fetch pets');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPets();
  }, []);

  const handleDelete = async (petId) => {
    if (!petId) {
      console.error('Invalid petId');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/pets/${petId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setPets(pets.filter(pet => pet.petId !== petId));
      } else {
        console.error('Failed to delete pet');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOpenModal = (pet) => {
    setSelectedPet(pet);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedPet(null);
    setError('');
  };

  const handleUpdatePet = async () => {
    if (!selectedPet.name || !selectedPet.species) {
      setError('Name and Species are required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', selectedPet.name);
    formData.append('species', selectedPet.species);
    formData.append('breed', selectedPet.breed);
    formData.append('age', selectedPet.age);
    formData.append('color', selectedPet.color);
    formData.append('gender', selectedPet.gender);
    formData.append('description', selectedPet.description);
    formData.append('petAdoptionStatus', selectedPet.petAdoptionStatus);
    formData.append('petTrainStatus', selectedPet.petTrainStatus);
    formData.append('petHealthStatus', selectedPet.petHealthStatus);

    if (selectedPet.petPictureFile) {
      formData.append('petPicture', selectedPet.petPictureFile);
    }

    try {
      const response = await fetch(`http://localhost:8080/pets/${selectedPet.petId}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const updatedPet = await response.json();
        setPets(pets.map(pet => (pet.petId === updatedPet.petId ? updatedPet : pet)));
        handleCloseModal();
      } else {
        const errorText = await response.text();
        console.error('Failed to update pet:', errorText);
        setError('Failed to update pet. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while updating the pet.');
    }
  };

  return (
    <div className="shelter-pets-container">
      <h2>All Pets</h2>
      <table className="pets-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Color</th>
            <th>Gender</th>
            <th>Description</th>
            <th>Status</th>
            <th>Training Status</th>
            <th>Health Status</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map(pet => (
            <tr key={pet.petId}>
              <td>{pet.name}</td>
              <td>{pet.species}</td>
              <td>{pet.breed}</td>
              <td>{pet.age}</td>
              <td>{pet.color}</td>
              <td>{pet.gender}</td>
              <td>{pet.description}</td>
              <td>{pet.petAdoptionStatus}</td>
              <td>{pet.petTrainStatus}</td>
              <td>{pet.petHealthStatus}</td>
              <td>
                <img src={`http://localhost:8080/uploads/${pet.petPicture}`} alt={pet.name || "Pet Image"} width="100" />
              </td>
              <td>
                <button className="action-button delete-button" onClick={() => handleDelete(pet.petId)}>Delete</button>
                <button className="action-button update-button" onClick={() => handleOpenModal(pet)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPet && (
        <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} className="modal" overlayClassName="overlay">
          <h2>Update Pet</h2>
          {error && <p className="error-text">{error}</p>}
          <form className="update-form">
            <label>Name</label>
            <input
              type="text"
              value={selectedPet.name}
              onChange={(e) => setSelectedPet({ ...selectedPet, name: e.target.value })}
            />
            <label>Species</label>
            <input
              type="text"
              value={selectedPet.species}
              onChange={(e) => setSelectedPet({ ...selectedPet, species: e.target.value })}
            />
            <label>Breed</label>
            <input
              type="text"
              value={selectedPet.breed}
              onChange={(e) => setSelectedPet({ ...selectedPet, breed: e.target.value })}
            />
            <label>Age</label>
            <input
              type="number"
              value={selectedPet.age}
              onChange={(e) => setSelectedPet({ ...selectedPet, age: e.target.value })}
            />
            <label>Color</label>
            <input
              type="text"
              value={selectedPet.color}
              onChange={(e) => setSelectedPet({ ...selectedPet, color: e.target.value })}
            />
            <label>Gender</label>
            <input
              type="text"
              value={selectedPet.gender}
              onChange={(e) => setSelectedPet({ ...selectedPet, gender: e.target.value })}
            />
            <label>Description</label>
            <input
              type="text"
              value={selectedPet.description}
              onChange={(e) => setSelectedPet({ ...selectedPet, description: e.target.value })}
            />
            <label>Adoption Status</label>
            <input
              type="text"
              value={selectedPet.petAdoptionStatus}
              onChange={(e) => setSelectedPet({ ...selectedPet, petAdoptionStatus: e.target.value })}
            />
            <label>Training Status</label>
            <input
              type="text"
              value={selectedPet.petTrainStatus}
              onChange={(e) => setSelectedPet({ ...selectedPet, petTrainStatus: e.target.value })}
            />
            <label>Health Status</label>
            <input
              type="text"
              value={selectedPet.petHealthStatus}
              onChange={(e) => setSelectedPet({ ...selectedPet, petHealthStatus: e.target.value })}
            />
          </form>
          <div className="modal-buttons">
            <button className="modal-button update" onClick={handleUpdatePet}>Update</button>
            <button className="modal-button close" onClick={handleCloseModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShelterPets;

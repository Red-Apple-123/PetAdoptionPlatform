import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PetList = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:8080/pets/category/${category}`)
        .then(response => response.json())
        .then(data => setPets(data))
        .catch(error => console.error('Error fetching pets:', error));
    }, [category]);
  
    const handleSeeDetails = (petId) => {
        navigate(`/pets/${petId}`);
    };

    return (
      <div>
        <h2>{category === 'CAT' ? 'Cats' : 'Dogs'} Available for Adoption</h2>
        <div className="pet-list">
          {pets.map(pet => (
            <div key={pet.petId} className="pet-card">
              {pet.petPicture && (
                <img 
                  src={`http://localhost:8080/uploads/${pet.petPicture}`} 
                  alt={pet.name || 'Pet Image'} 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                />
              )}
              <h3>{pet.name || 'Unnamed Pet'}</h3>
              <p>Age: {pet.age || 'Unknown'}</p>
              <p>Gender: {pet.gender || 'Unknown'}</p>
              <button onClick={() => handleSeeDetails(pet.petId)}>See Details</button>
            </div>
          ))}
        </div>
      </div>
    );
};

export default PetList;

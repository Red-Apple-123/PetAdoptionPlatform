import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PetDetails = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/pets/${petId}`)
            .then(response => response.json())
            .then(data => setPet(data))
            .catch(error => console.error('Error fetching pet details:', error));
    }, [petId]);

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    const handleApplication = () => {
        navigate(`/adoption-application`); // Pass petId via URL
    };

    if (!pet) return <p>Loading...</p>;

    return (
        <div className="pet-details">
            <div><button onClick={handleGoBack}>Go Back</button></div>
            <div className="pet-image">
                {pet.petPicture && (
                    <img 
                        src={`http://localhost:8080/uploads/${pet.petPicture}`} 
                        alt={pet.name || 'Pet Image'} 
                        style={{ width: '368px', height: '322px', objectFit: 'cover' }} 
                    />
                )}
            </div>
            <div className="pet-info">
                <h2>{pet.name || 'Unnamed Pet'}</h2>
                <p><strong>Description:</strong> {pet.description || 'No description available'}</p>
                <ul>
                    <li><strong>Age:</strong> {pet.age || 'Unknown'}</li>
                    <li><strong>Breed:</strong> {pet.breed || 'Unknown'}</li>
                    <li><strong>Color:</strong> {pet.color || 'Unknown'}</li>
                    <li><strong>Gender:</strong> {pet.gender || 'Unknown'}</li>
                    <li><strong>Training Status:</strong> {pet.petTrainStatus || 'Unknown'}</li>
                    <li><strong>Health Status:</strong> {pet.petHealthStatus || 'Unknown'}</li>
                    <li><strong>Species:</strong> {pet.species || 'Unknown'}</li>
                </ul>
                <button onClick={handleApplication}>Submit Application</button> {/* Submit Application Button */}
            </div>
        </div>
    );
};

export default PetDetails;

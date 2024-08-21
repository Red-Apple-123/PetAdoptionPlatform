import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import { useLocation } from 'react-router-dom';

const AdoptionApplicationForm = () => {
  //const location = useLocation(); // Correctly using useLocation to get the state
  //const { state } = location; // Destructure state from location

  const { petId } = useParams(); // Get petId from URL

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    age: '',
    email: '',
    occupation: '',
    havePet: 'NO',
    petName: '',
    petAge: '',
    petDescription: '',
    petSpecies: '',
  });

  //const [petId, setPetId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  // Get petId from URL params
  //const { petId: petIdParam } = useParams();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId'); // Replace with actual logic
    setUserId(loggedInUserId);
    //setPetId(state?.petId);//set petId from state
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'havePet') {
      setShowAdditionalFields(value === 'YES');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure userId and petId are set before submitting
    if (!userId) {
        alert('User ID  missing');
        return;
      }
    // if(!petId){
    //   alert("PetId missing");
    //   return;
    // }
    // Create application data with both application and details
    const applicationData = {
      petId,
      userId,
      applicationStatus: 'PENDING', // Default status
      submissionDate: new Date().toISOString().split('T')[0], // Current date
      details: {
        ...formData,
      },
    };

    try {
      await axios.post('http://localhost:8080/adoption-application', applicationData);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Do you have other pets?</label>
        <select
          name="havePet"
          value={formData.havePet}
          onChange={handleChange}
        >
          <option value="NO">No</option>
          <option value="YES">Yes</option>
        </select>
      </div>

      {showAdditionalFields && (
        <>
          <div>
            <label>Pet Name:</label>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Pet Age:</label>
            <input
              type="text"
              name="petAge"
              value={formData.petAge}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Pet Description:</label>
            <textarea
              name="petDescription"
              value={formData.petDescription}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Pet Species:</label>
            <input
              type="text"
              name="petSpecies"
              value={formData.petSpecies}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <button type="submit">Submit Application</button>
    </form>
  );
};

export default AdoptionApplicationForm;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetCategory = () => {
  const navigate = useNavigate();

  const handleViewCats = () => {
    navigate('/pets/category/CAT');
  };

  const handleViewDogs = () => {
    navigate('/pets/category/DOG');
  };

  return (
    <div>
      <h2>Select Pet Category</h2>
      <button onClick={handleViewCats}>View Cats</button>
      <button onClick={handleViewDogs}>View Dogs</button>
    </div>
  );
};

export default PetCategory;

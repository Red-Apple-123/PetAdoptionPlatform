import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './pages/UserDashboard';
import ShelterDashboard from './pages/ShelterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UploadPet from './pages/UploadPet';
import ShelterPets from './pages/ShelterPets';
import PetCategory from './pages/PetCategory';
import PetList from './pages/PetList';
import PetDetails from './pages/PetDetails'; 
import AdoptionApplication from './pages/AdoptionApplication';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_USER']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/shelter-dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_SHELTER']}>
            <ShelterDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/upload-pet" element={
          <ProtectedRoute allowedRoles={['ROLE_SHELTER']}>
            <UploadPet />
          </ProtectedRoute>
        } />
        <Route path="/shelter-pets" element={
          <ProtectedRoute allowedRoles={['ROLE_SHELTER']}>
            <ShelterPets />
          </ProtectedRoute>
        }/>
        <Route path="/pets/categories" element={
          <ProtectedRoute allowedRoles={['ROLE_USER']}>
            <PetCategory />
          </ProtectedRoute>
        } />
        
        <Route path="/pets/category/:category" element={
          <ProtectedRoute allowedRoles={['ROLE_USER']}>
            <PetList />
          </ProtectedRoute>
        }/>
        <Route path="/pets/:petId" element={
          <ProtectedRoute allowedRoles={['ROLE_USER']}>
            <PetDetails />
          </ProtectedRoute>
        } />
        <Route path="/adoption-application" element={
          <ProtectedRoute allowedRoles={['ROLE_USER']}>
            <AdoptionApplication />
          </ProtectedRoute>
        } />
        </Routes>
    </Router>
  );
};

export default App;

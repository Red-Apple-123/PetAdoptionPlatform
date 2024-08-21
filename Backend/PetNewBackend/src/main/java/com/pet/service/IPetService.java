package com.pet.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.pet.dto.petDTO;
import com.pet.entities.Pet;
import com.pet.enums.PetCategory;

import jakarta.servlet.http.HttpSession;

public interface IPetService {

	Pet createPet(String name, String species, String breed, int age, String color, String gender, String description, String category, String healthStatus, String petAdoptionStatus, 
            String petTrainStatus,MultipartFile petPic, HttpSession session);
	
	List<petDTO> getPetsByShelterId(Integer shelterId);
	
    Integer findShelterIdByUserId(Integer userId);
    
    void deletePet(int petId);
    
    Pet updatePet(Integer petId, Map<String, String> updatedPet, MultipartFile petPicture);
    
    List<petDTO> getPetByCategory(PetCategory category);
    
    petDTO getPetById(Integer petId);
    
    Pet getPetByIdnew(Integer petId);

}

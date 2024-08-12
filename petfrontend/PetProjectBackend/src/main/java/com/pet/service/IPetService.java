package com.pet.service;

import java.io.IOException;
import java.util.List;

import com.pet.dto.PetDTO;
import com.pet.entities.Pet;

public interface IPetService {

	public PetDTO createPet(PetDTO petDto) throws IOException;

	public List<PetDTO> getAllPets();
	
	public PetDTO getPetDetails(Long id);
	
	public boolean deletePet(Long id);
	
	public Pet updatePet(Long id, Pet pet);
}

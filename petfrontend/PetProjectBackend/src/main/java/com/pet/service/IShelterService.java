package com.pet.service;

import java.util.List;

import com.pet.dto.ShelterDTO;
import com.pet.entities.Shelter;

public interface IShelterService {

	public Shelter createShelter(Shelter shelter);
	
	public List<ShelterDTO> getAllShelters();
	
	public ShelterDTO getShelterDetails(Long id);
	
	public boolean deleteShelter(Long id);
	
	public Shelter updateShelter(Long id, Shelter shelter);
}

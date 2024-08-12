package com.pet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pet.dto.ShelterDTO;
import com.pet.entities.Shelter;
import com.pet.exception.ResourceNotFoundException;
import com.pet.repository.ShelterRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class ShelterServiceImpl implements IShelterService {

	@Autowired
	private ShelterRepository shelterRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public Shelter createShelter(Shelter shelter) {
		return shelterRepository.save(shelter);
	}

	@Override
	public List<ShelterDTO> getAllShelters() {
		return shelterRepository.findAll()
				.stream()
				.map(shelter -> mapper.map(shelter, ShelterDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ShelterDTO getShelterDetails(Long shelterId) throws ResourceNotFoundException {
		ShelterDTO shelterDTO = new ShelterDTO();
		mapper.map(shelterRepository.findById(shelterId).orElseThrow(()->new ResourceNotFoundException("Shelter Not found")),
				shelterDTO);
		return shelterDTO;
	}

	@Override
	public boolean deleteShelter(Long shelterId) throws ResourceNotFoundException {
		if(shelterRepository.existsById(shelterId)) {
			shelterRepository.deleteById(shelterId);
			return true;
		}
		return false;
	}

	@Override
	public Shelter updateShelter(Long id, Shelter shelter) {
		Shelter existingShelter = shelterRepository.findById(id)
		        .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id " + id));
		existingShelter.setAddress(shelter.getAddress());
		existingShelter.setContact(shelter.getContact());
		existingShelter.setPetCount(shelter.getPetCount());
		
		shelterRepository.save(existingShelter);
		return existingShelter;
	}
	

}

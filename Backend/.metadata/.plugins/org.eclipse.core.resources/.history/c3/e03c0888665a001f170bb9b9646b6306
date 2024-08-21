package com.pet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.pet.dto.PetDTO;
import com.pet.entities.Pet;
import com.pet.repository.PetRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class PetServiceImpl implements IPetService {

	@Autowired
	private PetRepository petRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	@Value("${file.pet.upload.location}")
	private String petPictureFolderPath;
	
	@Override
	public PetDTO createPet(PetDTO petDto) {
	    Pet petEntity = mapper.map(petDto, Pet.class);    
	    petRepository.save(petEntity);
	    return petDto;
	}


	@Override
	public PetDTO getPetDetails(Long id) {
		return petRepository.findById(id)
				.map(pet -> {
					PetDTO petDTO = new PetDTO();
					mapper.map(pet,petDTO);
					return petDTO;
				})
				.orElse(null);
	}

	@Override
	public boolean deletePet(Long petId) {
		if (petRepository.existsById(petId)) {
			petRepository.deleteById(petId);
			return true;
		}
		return false;
	}

	@Override
	public Pet updatePet(Long id, Pet pet) {
		return petRepository.findById(id).map(existingPet -> {
	        existingPet.setName(pet.getName());
	        existingPet.setAge(pet.getAge());
	        existingPet.setBreed(pet.getBreed());
	        existingPet.setCategory(pet.getCategory());
	        existingPet.setColor(pet.getColor());
	        existingPet.setDescription(pet.getDescription());
	        existingPet.setGender(pet.getGender());
	        existingPet.setHealthStatus(pet.getHealthStatus());
	        existingPet.setPetAdoptionStatus(pet.getPetAdoptionStatus());
	        existingPet.setPetTrainStatus(pet.getPetTrainStatus());
	        existingPet.setSpecies(pet.getSpecies());
	        petRepository.save(existingPet);
	        return existingPet;
	    }).orElse(null);
	}

	@Override
	public List<PetDTO> getAllPets() {
		return petRepository.findAll() 
				.stream() 
				.map(pet -> mapper.map(pet,PetDTO.class)) 
				.collect(Collectors.toList());
	}

	

	

}

package com.pet.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Clock;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pet.apiResponse.ApiResponse;
import com.pet.dto.PetDTO;
import com.pet.entities.Pet;
import com.pet.enums.PetAdoptionStatus;
import com.pet.enums.PetCategory;
import com.pet.enums.PetHealthStatus;
import com.pet.enums.PetTrainStatus;
import com.pet.service.IPetService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;



@RestController
@RequestMapping("/pets")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")


public class PetController {
	
	@Autowired
	private IPetService petService;
	
	@PostMapping("/create-pet")
	public ResponseEntity<?> createPet(
	        @RequestParam("name") String name,
	        @RequestParam("species") String species,
	        @RequestParam("breed") String breed,
	        @RequestParam("age") String age,
	        @RequestParam("color") String color,
	        @RequestParam("gender") String gender,
	        @RequestParam("description") String description,
	        @RequestParam(value="petPicPath", required=false) MultipartFile petPicture,
	        @RequestParam("petHealthStatus") String petHealthStatus,
	        @RequestParam("category") String category,
	        @RequestParam("petTrainStatus") String petTrainStatus,
	        @RequestParam("petAdoptionStatus") String petAdoptionStatus
	        ) throws IOException {
	    
	    PetDTO petDto = new PetDTO();
	    petDto.setName(name);
	    petDto.setSpecies(species);
	    petDto.setBreed(breed);
	    petDto.setAge(Integer.parseInt(age));
	    petDto.setColor(color);
	    petDto.setGender(gender);
	    petDto.setDescription(description);
	    
	    String petPicPath = null;
	    if (petPicture != null && !petPicture.isEmpty()) {
	        Clock clock = Clock.systemDefaultZone();
	        long milliSeconds = clock.millis();
	        petPicPath = milliSeconds + petPicture.getOriginalFilename();
	        Files.copy(petPicture.getInputStream(), Paths.get(petPicPath), StandardCopyOption.REPLACE_EXISTING);
	    }
	    petDto.setPetPicture(petPicPath);
	    
	    PetHealthStatus newPetHealthStatus = PetHealthStatus.valueOf(petHealthStatus);
	    petDto.setPetHealthStatus(newPetHealthStatus);
	    
	    PetCategory newCategory = PetCategory.valueOf(category);
	    petDto.setCategory(newCategory);
	    
	    PetTrainStatus newPetTrainStatus = PetTrainStatus.valueOf(petTrainStatus);
	    petDto.setPetTrainStatus(newPetTrainStatus);
	    
	    PetAdoptionStatus newPetAdoptionStatus = PetAdoptionStatus.valueOf(petAdoptionStatus);
	    petDto.setPetAdoptionStatus(newPetAdoptionStatus);  
	    
	    petService.createPet(petDto);
	    return ResponseEntity.status(HttpStatus.CREATED)
	            .body(new ApiResponse<>(petDto,"Pet Created Successfully",true));
	}

	
	@GetMapping("/get-all-pets")
	public ResponseEntity<ApiResponse<List<PetDTO>>> getAllPets(){
		return ResponseEntity.ok(new ApiResponse<>(petService.getAllPets(), "", true));
	}
	
	@PutMapping("/all-pets/{id}")
	public ResponseEntity<ApiResponse<Pet>> updatePet(@PathVariable Long id, @RequestBody Pet pet) {
		Pet updatedpet= petService.updatePet(id, pet);
		if(updatedpet != null) {
			return ResponseEntity.ok(new ApiResponse<>(updatedpet, "Pet updated Successfully", true));
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null, "Pet Not Found", false));
		}
	}
	
	@GetMapping("/pet-details/{id}")
	public ResponseEntity<ApiResponse<PetDTO>> getPetDetails(@PathVariable Long id) 
	{
		PetDTO petDTO=petService.getPetDetails(id);
		if(petDTO == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null,"Pet not Found",false));
		}else {
			return ResponseEntity.ok(new ApiResponse<>(petDTO,"Pet retrieved Succesfully",true));
		}
	}
	
	@DeleteMapping("/delete-pet/{id}")
	public ResponseEntity<ApiResponse<Void>> deletePet(@PathVariable Long id){
		boolean isDeleted = petService.deletePet(id);
		if(isDeleted) {
			return ResponseEntity.ok(new ApiResponse<>(null, "Pet deleted Successfully", true));
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null, "Pet not Found", false));
		}
	}
}

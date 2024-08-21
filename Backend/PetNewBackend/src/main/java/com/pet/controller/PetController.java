package com.pet.controller;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

import com.pet.dto.petDTO;
import com.pet.entities.Pet;
import com.pet.enums.PetCategory;
import com.pet.service.IPetService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/pets")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PetController {

	@Autowired IPetService petService;
	
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPet(
            @RequestParam String name,
            @RequestParam String species,
            @RequestParam String breed,
            @RequestParam int age,
            @RequestParam String color,
            @RequestParam String gender,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam String healthStatus,
            @RequestParam String petAdoptionStatus,
            @RequestParam String petTrainStatus,
            @RequestParam(value = "petPic", required = false) MultipartFile petPic,
            HttpSession session) {
        try {
            petService.createPet(name, species, breed, age, color, gender, description, category,healthStatus, petAdoptionStatus, petTrainStatus ,petPic, session);
            return ResponseEntity.ok("Pet uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to upload pet: " + e.getMessage());
        }
    }
    
    @GetMapping("/shelter-pets")
    public ResponseEntity<List<petDTO>> getPetsByShelterId(HttpSession session) {
        // Fetch the logged-in user's ID from the session
        Integer userId = (Integer) session.getAttribute("user_id");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        
        // Get shelter_id using the user_id
        Integer shelterId = petService.findShelterIdByUserId(userId);

        // Fetch all pets by shelter_id
        List<petDTO> pets = petService.getPetsByShelterId(shelterId);

        return ResponseEntity.ok(pets);
    }
    
    @DeleteMapping("/{petId}")
    public ResponseEntity<String> deletePet(@PathVariable("petId") int petId) {
        try {
            petService.deletePet(petId);
            return ResponseEntity.ok("Pet deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete pet: " + e.getMessage());
        }
    }
    
    @PutMapping("/{petId}")
    public ResponseEntity<Pet> updatePet(
            @PathVariable Integer petId,
            @RequestParam Map<String, String> updatedPet,
            @RequestParam(required = false) MultipartFile petPicture) {

        Pet pet = petService.updatePet(petId, updatedPet, petPicture);
        if (pet != null) {
            return ResponseEntity.ok(pet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/category/{category}")
    public List<petDTO> getPetsByCategory(@PathVariable String category){
    	PetCategory cat = PetCategory.valueOf(category.toUpperCase());
    	return petService.getPetByCategory(cat)
    			.stream()
    			.map(pet -> new petDTO(pet.getPetId(),pet.getName(), pet.getAge(), pet.getGender(), pet.getPetPicture()))
    			.collect(Collectors.toList());
    }
    
    
    @GetMapping("/{petId}")
    public ResponseEntity<petDTO> getPetById(@PathVariable Integer petId) {
        petDTO pet = petService.getPetById(petId); // Fetch the pet details using service
        if (pet != null) {
            return ResponseEntity.ok(pet);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if pet is not found
        }
    }

}

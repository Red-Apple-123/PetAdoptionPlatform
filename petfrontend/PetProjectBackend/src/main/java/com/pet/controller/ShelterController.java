package com.pet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pet.apiResponse.ApiResponse;
import com.pet.dto.ShelterDTO;
import com.pet.entities.Shelter;
import com.pet.service.IShelterService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/shelters")
public class ShelterController {

	@Autowired
	private IShelterService shelterService;
	
	@PostMapping
	public ResponseEntity<ApiResponse<Shelter>> createShelter(@RequestBody Shelter shelter) {
		Shelter createdShelter = shelterService.createShelter(shelter);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(createdShelter,"Shelter Created Successfully",true));
	}
	
	@GetMapping
	public ResponseEntity<ApiResponse<List<ShelterDTO>>> getAllShelters(){
		return ResponseEntity.ok(new ApiResponse<>(shelterService.getAllShelters(), "", true));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<Shelter>> updatedShelter(@PathVariable Long id, @RequestBody Shelter shelter) {
		Shelter updatedShelter= shelterService.updateShelter(id, shelter);
		if(updatedShelter != null) {
			return ResponseEntity.ok(new ApiResponse<>(updatedShelter, "Shelter updated Successfully", true));
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null, "Shelter Not Found", false));
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<ShelterDTO>> getShelterDetails(@PathVariable Long id) 
	{
		ShelterDTO petDTO=shelterService.getShelterDetails(id);
		if(petDTO == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null,"Shelter not Found",false));
		}else {
			return ResponseEntity.ok(new ApiResponse<>(petDTO,"Shelter retrieved Succesfully",true));
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteShelter(@PathVariable Long id){
		boolean isDeleted = shelterService.deleteShelter(id);
		if(isDeleted) {
			return ResponseEntity.ok(new ApiResponse<>(null, "Shelter deleted Successfully", true));
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null, "Shelter not Found", false));
		}
	}
}

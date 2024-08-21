package com.pet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pet.entities.AdoptionApplication;
import com.pet.service.IAdoptionApplicationService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/adoptionApplication")
public class AdoptionApplicationController {

	@Autowired
	private IAdoptionApplicationService adoptionApplicationService;
	
	@PostMapping
	public AdoptionApplication createPet(@RequestBody AdoptionApplication app) {
		return adoptionApplicationService.createAdoptionApplication(app);
	}
	
	
}

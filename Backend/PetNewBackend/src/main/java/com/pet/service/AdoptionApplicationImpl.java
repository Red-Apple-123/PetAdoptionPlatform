package com.pet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pet.entities.AdoptionApplication;
import com.pet.repository.AdoptionApplicationRepository;

import jakarta.transaction.Transactional;
@Component
@Transactional
public class AdoptionApplicationImpl implements IAdoptionApplicationService {

	@Autowired
	private AdoptionApplicationRepository adoptionApplicationRepository;
	
	@Override
	public AdoptionApplication saveAdoptionApplication(AdoptionApplication application) {
        return adoptionApplicationRepository.save(application);
    }

}

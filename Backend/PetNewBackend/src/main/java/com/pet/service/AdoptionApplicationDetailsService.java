package com.pet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pet.entities.AdoptionApplicationDetails;
import com.pet.repository.AdoptionApplicationDetailsRepository;

import jakarta.transaction.Transactional;
@Component
@Transactional
public class AdoptionApplicationDetailsService implements IAdoptionApplicationDetailsService {

	@Autowired
    private AdoptionApplicationDetailsRepository adoptionApplicationDetailsRepository;
	
	@Override
	public AdoptionApplicationDetails saveAdoptionApplicationDetails(AdoptionApplicationDetails details) {
		return adoptionApplicationDetailsRepository.save(details);
	}

}

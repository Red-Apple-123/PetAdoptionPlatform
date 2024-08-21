package com.pet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pet.dto.AdoptionApplicationDTO;
import com.pet.entities.AdoptionApplication;
import com.pet.exception.ResourceNotFoundException;
import com.pet.repository.AdoptionApplicationRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdoptionApplicationServiceImpl implements IAdoptionApplicationService {

	@Autowired
	private AdoptionApplicationRepository adoptionApplicationRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public AdoptionApplication createAdoptionApplication(AdoptionApplication adoptionApplication) {
		return adoptionApplicationRepository.save(adoptionApplication);
	}

	@Override
	public List<AdoptionApplicationDTO> getAllAdoptionApplications(){
		return adoptionApplicationRepository.findAll() 
				.stream() 
				.map(app -> mapper.map(app,AdoptionApplicationDTO.class)) 
				.collect(Collectors.toList());
	}

	@Override
	public boolean deleteAdoptionApplication(Long appId){
		if (adoptionApplicationRepository.existsById(appId)) {
			adoptionApplicationRepository.deleteById(appId);
			return true;
		}
		return false;
	}

	@Override
	public AdoptionApplication updateAdoptionApplication(Long appId, AdoptionApplication adoptionApplication) {
		AdoptionApplication existingApp = adoptionApplicationRepository.findById(appId)
		        .orElseThrow(() -> new ResourceNotFoundException("Application not found with id " + appId));
		
		existingApp.setApplicationStatus(adoptionApplication.getApplicationStatus());
		existingApp.setSubmissionDate(adoptionApplication.getSubmissionDate());
		
		adoptionApplicationRepository.save(existingApp);
		return existingApp;
	}

	@Override
	public AdoptionApplicationDTO getAdoptionApplication(Long appId){
		return adoptionApplicationRepository.findById(appId)
				.map(app -> {
					AdoptionApplicationDTO appDTO = new AdoptionApplicationDTO();
					mapper.map(app,appDTO);
					return appDTO;
				})
				.orElse(null);
	}
	
	
	
}

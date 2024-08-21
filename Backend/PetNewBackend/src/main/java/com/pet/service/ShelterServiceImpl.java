package com.pet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pet.entities.Shelter;
import com.pet.repository.ShelterRepository;

import jakarta.transaction.Transactional;
@Component
@Transactional
public class ShelterServiceImpl implements IShelterService {

	@Autowired
	private ShelterRepository shelterRepository;

	@Override
	public Shelter saveShelter(Shelter shelter) {
		return shelterRepository.save(shelter);
	}
}

package com.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet.entities.AdoptionApplicationDetails;

public interface AdoptionApplicationDetailsRepository extends JpaRepository<AdoptionApplicationDetails, Integer> {

}

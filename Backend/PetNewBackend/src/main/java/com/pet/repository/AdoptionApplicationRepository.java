package com.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pet.entities.AdoptionApplication;

public interface AdoptionApplicationRepository extends JpaRepository<AdoptionApplication, Integer> {

}

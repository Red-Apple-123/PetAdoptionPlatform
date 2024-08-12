package com.pet.dto;

import java.time.LocalDate;

import com.pet.enums.ApplicationStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdoptionApplicationDTO {
	
	private int applicationId;
	private LocalDate submissionDate;
	private ApplicationStatus applicationStatus;
}

package com.pet.dto;

import java.time.LocalDate;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pet.enums.RoleEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	private Long Id;
	private String email;
	@JsonIgnore
	private String password;
	private String firstName;
	private String lastName;
	private MultipartFile profilePicture;
	private LocalDate registrationDate;
	private Set<RoleEnum> userRoles;
	
}

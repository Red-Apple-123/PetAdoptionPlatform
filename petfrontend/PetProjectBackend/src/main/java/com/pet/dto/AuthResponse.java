package com.pet.dto;

import java.util.HashSet;
import java.util.Set;

import com.pet.enums.RoleEnum;

public class AuthResponse {
	private String message;
	private String jwtToken;
	private Long id;
	private String email;
	private String firstName;
	private String lastName;
	private byte[] profilePicture;
	private Set<RoleEnum> userRoles = new HashSet<RoleEnum>();
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getJwtToken() {
		return jwtToken;
	}
	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public byte[] getProfilePicture() {
		return profilePicture;
	}
	public void setProfilePicture(byte[] profilePicture) {
		this.profilePicture = profilePicture;
	}
	public Set<RoleEnum> getUserRoles() {
		return userRoles;
	}
	public void setUserRoles(Set<RoleEnum> userRoles) {
		this.userRoles = userRoles;
	}
	
	
	
}

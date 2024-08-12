package com.pet.service;

import java.io.IOException;

import com.pet.dto.UserDTO;



public interface IUserDetails {
	public UserDTO registerUser(UserDTO user) throws IOException;
	
}

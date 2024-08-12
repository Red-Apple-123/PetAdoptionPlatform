package com.pet.controller;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pet.dto.UserDTO;
import com.pet.enums.RoleEnum;
import com.pet.service.IUserDetails;


@RestController
@RequestMapping("/pet")
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UsersController {
	
	@Autowired
	private IUserDetails userDetails;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(
			@RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture,
            @RequestParam("userRoles") Set<String> userRoles) throws IOException{
		
		//the email was getting stored in the database with double quotes, that why trimmed it before storing in the database
		//String quotesRemovedEmail = email.replace("\"", "").trim();
		
		Set<RoleEnum> roleEnums = userRoles.stream()
                .map(roleString -> {
                    // Clean up and normalize role string
                    String cleanedRole = roleString.replace("\"", "").trim().toUpperCase();
                    try {
                        return RoleEnum.valueOf(cleanedRole);
                    } catch (IllegalArgumentException e) {
                        throw new RuntimeException("Invalid role: " + cleanedRole, e);
                    }
                })
                .collect(Collectors.toSet());

        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(email);
        userDTO.setFirstName(firstName);
        userDTO.setPassword(password);
        userDTO.setProfilePicture(profilePicture);
        userDTO.setUserRoles(roleEnums);

        userDetails.registerUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
	}
}
package com.pet.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Clock;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.pet.dto.UserDTO;
import com.pet.entities.User;
import com.pet.repository.UserRepository;
import com.pet.security.CustomUserDetails;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class UserDetailsImpl implements UserDetailsService, IUserDetails {

	@Autowired
	private UserRepository userRepo;
//	@Autowired
//	private RoleRepository roleRepo;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private ModelMapper mapper;

	@Value("${file.profile.upload.location}")
	private String profilePictureFolderPath;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID !!"));
		return new CustomUserDetails(user);
	}

	@Override
	public UserDTO registerUser(UserDTO userDto) throws IOException {
		User userEntity = mapper.map(userDto, User.class);
		Clock clock = Clock.systemDefaultZone();
		long milliSeconds = clock.millis();
		MultipartFile profilePictureFile = userDto.getProfilePicture();
		String completePath = profilePictureFolderPath + File.separator + milliSeconds
				+ profilePictureFile.getOriginalFilename();
		Files.copy(profilePictureFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING);

		userEntity.setProfilePicPath(completePath);
		
//		String quotesRemovedEmail = userDto.getEmail().replace("\"", "").trim();
//	    userDto.setEmail(quotesRemovedEmail);

		// Set roles directly from DTO
	    userEntity.setUserRoles(userDto.getUserRoles());

	    // Encode password and save user
	    userEntity.setPassword(encoder.encode(userDto.getPassword()));
	    userRepo.save(userEntity);
	    
		//userEntity.setUserRoles(roleRepo.findByRoleNameIn(userDto.getUserRoles()));
		//userEntity.setPassword(encoder.encode(userDto.getPassword()));

		//User persistentUser = userRepo.save(userEntity);
		return userDto;
	}

	
	
	

}
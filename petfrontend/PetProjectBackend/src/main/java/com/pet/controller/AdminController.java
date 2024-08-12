package com.pet.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pet/admin")
@CrossOrigin("*")
public class AdminController {
	
	@GetMapping("/get")
	public String getData() {
		return "Ok";
	}
}

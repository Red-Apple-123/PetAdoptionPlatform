package com.pet.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pet/user")
public class TestController {
	
	@GetMapping("/get")
	public String getData() {
		return "Ok";
	}
}

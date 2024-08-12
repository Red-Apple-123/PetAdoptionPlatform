package com.pet.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@GetMapping("/pet")
	public ResponseEntity<?> health() {
		return ResponseEntity.status(HttpStatus.OK).body("pets");
	}
	
	@RequestMapping("/ui")
    public String forward() {
        // Forward requests to the React app
        return "forward:/ui/index.html";
    }
}

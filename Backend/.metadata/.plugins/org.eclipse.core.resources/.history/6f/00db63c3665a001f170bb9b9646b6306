package com.pet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pet.apiResponse.ApiResponse;
import com.pet.dto.AppointmentDTO;
import com.pet.entities.Appointment;
import com.pet.service.IAppointmentService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

	@Autowired
	private IAppointmentService appointmentService;
	
	@PostMapping
	public ResponseEntity<ApiResponse<Appointment>> createAppointment(@RequestBody Appointment apt) {
		Appointment createdApt = appointmentService.createAppointment(apt);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(createdApt,"Appointment Created Successfully",true));
	}
	
	@GetMapping
	public ResponseEntity<ApiResponse<List<AppointmentDTO>>> getAllAppointments(){
		return ResponseEntity.ok(new ApiResponse<>(appointmentService.getAllAppointments(), "", true));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<Appointment>> updateAppointment(@PathVariable Long id, @RequestBody Appointment apt) {
		Appointment updatedpet= appointmentService.updateAppointment(id, apt);
		if(updatedpet != null) {
			return ResponseEntity.ok(new ApiResponse<>(updatedpet, "Appointment updated Successfully", true));
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null, "Appointment Not Found", false));
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<AppointmentDTO>> getAppointmentDetails(@PathVariable Long id) 
	{
		AppointmentDTO aptDTO=appointmentService.getAppointmentDetails(id);
		if(aptDTO == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null,"Appointment not Found",false));
		}else {
			return ResponseEntity.ok(new ApiResponse<>(aptDTO,"Appointment retrieved Succesfully",true));
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteAppointment(@PathVariable Long id){
		boolean isDeleted = appointmentService.deleteAppointment(id);
		if(isDeleted) {
			return ResponseEntity.ok(new ApiResponse<>(null, "Appointment deleted Successfully", true));
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null, "Appointment not Found", false));
		}
	}
}

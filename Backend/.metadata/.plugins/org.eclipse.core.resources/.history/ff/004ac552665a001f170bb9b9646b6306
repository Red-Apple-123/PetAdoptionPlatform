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
import com.pet.dto.PaymentDTO;
import com.pet.entities.Payment;
import com.pet.service.IPaymentService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/payments")
public class PaymentController {

	@Autowired
	private IPaymentService paymentService;

	@PostMapping
	public ResponseEntity<ApiResponse<Payment>> createPet(@RequestBody Payment pay) {
		Payment createdPay = paymentService.createPayment(pay);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(createdPay,"Payment Created Successfully",true));
	}
	
	@GetMapping
	public ResponseEntity<ApiResponse<List<PaymentDTO>>> getAllPets(){
		return ResponseEntity.ok(new ApiResponse<>(paymentService.getAllPayments(), "", true));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<Payment>> updatePet(@PathVariable Long id, @RequestBody Payment payment) {
		Payment updatedpay= paymentService.updatePayment(id, payment);
		if(updatedpay != null) {
			return ResponseEntity.ok(new ApiResponse<>(updatedpay, "Payment updated Successfully", true));
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null, "Payment Not Found", false));
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<PaymentDTO>> getPetDetails(@PathVariable Long id) 
	{
		PaymentDTO payDTO=paymentService.getPaymentDetails(id);
		if(payDTO == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null,"Payment not Found",false));
		}else {
			return ResponseEntity.ok(new ApiResponse<>(payDTO,"Payment retrieved Succesfully",true));
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> deletePayment(@PathVariable Long id){
		boolean isDeleted = paymentService.deletePayment(id);
		if(isDeleted) {
			return ResponseEntity.ok(new ApiResponse<>(null, "Payment deleted Successfully", true));
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(null, "Payment not Found", false));
		}
	}
}

package com.pet.service;

import java.util.List;

import com.pet.dto.PaymentDTO;
import com.pet.entities.Payment;
import com.pet.exception.ResourceNotFoundException;

public interface IPaymentService {
	public Payment createPayment(Payment payment);

	public List<PaymentDTO> getAllPayments();
	
	public PaymentDTO getPaymentDetails(Long id);
	
	public boolean deletePayment(Long id);
	
	public Payment updatePayment(Long id, Payment payment);
}

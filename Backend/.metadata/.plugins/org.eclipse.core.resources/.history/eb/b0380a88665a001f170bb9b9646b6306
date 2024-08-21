package com.pet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pet.dto.PaymentDTO;
import com.pet.entities.Payment;
import com.pet.repository.PaymentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements IPaymentService{

	@Autowired
	private PaymentRepository paymentRepository; 
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public Payment createPayment(Payment payment) {
		return paymentRepository.save(payment);
	}

	@Override
	public List<PaymentDTO> getAllPayments() {
		return paymentRepository.findAll() 
				.stream() 
				.map(payment -> mapper.map(payment,PaymentDTO.class)) 
				.collect(Collectors.toList());
	}

	@Override
	public PaymentDTO getPaymentDetails(Long payId){
		return paymentRepository.findById(payId)
				.map(pet -> {
					PaymentDTO payDTO = new PaymentDTO();
					mapper.map(pet,payDTO);
					return payDTO;
				})
				.orElse(null);
	}

	@Override
	public boolean deletePayment(Long payId){
		if (paymentRepository.existsById(payId)) {
			paymentRepository.deleteById(payId);
			return true;
		}
		return false;
	}

	@Override
	public Payment updatePayment(Long payId, Payment payment) {
		return paymentRepository.findById(payId).map(existingPayment -> {
		existingPayment.setAmount(payment.getAmount());
		existingPayment.setPay_status(payment.getPay_status());
		existingPayment.setTimestamp(payment.getTimestamp());
		paymentRepository.save(existingPayment);
		return existingPayment;
	    }).orElse(null);

	}	
}

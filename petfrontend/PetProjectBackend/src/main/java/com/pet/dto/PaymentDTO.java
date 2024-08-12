package com.pet.dto;

import java.time.LocalDateTime;

import com.pet.enums.PaymentStatus;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PaymentDTO {
	private int paymentId;
	private double amount;
	private LocalDateTime timestamp;
	private PaymentStatus pay_status;
}

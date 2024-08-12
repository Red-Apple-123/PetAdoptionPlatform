package com.pet.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.pet.enums.AppointmentStatus;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class AppointmentDTO {

	private int appointmentId;
	private String location;
	private LocalDate appointmentDate;
	private LocalTime appointmentTime;
	private AppointmentStatus appointmentStatus;
}

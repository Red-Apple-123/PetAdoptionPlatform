package com.pet.entities;

import java.time.LocalDate;
import java.time.LocalTime;



import com.pet.enums.AppointmentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="appointments")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="appointment_id")
	private int appointmentId;
	
	@Column(name="appointment_location",length=45)
	private String location;
	
	@Column(name="appointment_date")
	private LocalDate appointmentDate;
	
	@Column(name="appointment_time")
	private LocalTime appointmentTime;
	
	@Column(name = "appointment_satus", length = 20)
	@Enumerated(EnumType.STRING)
	private AppointmentStatus appointmentStatus;
	
	//appointment-->shelter(@ManyToOne)
	//appointment-->adoption_application(@onetoone)
	//appointment-->user(@manytoone)
	@ManyToOne
	@JoinColumn(name = "shelter_id")
	private Shelter shelter;

	@OneToOne(mappedBy = "appointment")
	private AdoptionApplication adoptionApplication;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}

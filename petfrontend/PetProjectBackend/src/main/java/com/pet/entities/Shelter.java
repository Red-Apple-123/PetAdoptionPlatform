package com.pet.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="shelters")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Shelter {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="shelter_id")
	private int shelterId;
	
	@Column(length=100)
	private String address;
	
	@Column(length=10)
	private String contact;
	
	@Column(name="pet_count",length=20)
	private int petCount;
	
	//private String id_proof;
	
	//shelter-->user(@oneToOne)
	//shelter-->payment(@oneToMany)
	//shelter-->adoption_Application(@oneToMany)
	//shelter-->appointment(@oneToMany)
	//shelter-->pet(@oneToMany)
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToMany(mappedBy = "shelter")
	private List<Payment> payments;
	
	@OneToMany(mappedBy = "shelter")
	private List<AdoptionApplication> adoptionApplications;
	
	@OneToMany(mappedBy = "shelter")
	private List<Appointment> appointments;
	
	@OneToMany(mappedBy = "shelter")
	private List<Pet> pets;
	
	
}

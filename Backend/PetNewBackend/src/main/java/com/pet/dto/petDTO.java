package com.pet.dto;

import com.pet.enums.PetAdoptionStatus;
import com.pet.enums.PetCategory;
import com.pet.enums.PetHealthStatus;
import com.pet.enums.PetTrainStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class petDTO {
	private int petId;
	private String name;
	private String species;
	private String breed;
	private Integer age;
	private String color;
	private String gender;
	private String description;
	private String petPicture;
	private PetHealthStatus petHealthStatus;
	private PetCategory category;
	private PetTrainStatus petTrainStatus;
	private PetAdoptionStatus petAdoptionStatus;
	
	public petDTO(int pet_id, String name2, int age2, String gender2, String petPicPath) {
		this.petId=pet_id;
		this.name=name2;
		this.age=age2;
		this.gender=gender2;
		this.petPicture=petPicPath;
	}

	public petDTO(int pet_id, String name2, int age2, String breed2, String color2, String gender2, String petPicPath,
			PetTrainStatus petTrainStatus2, PetHealthStatus healthStatus, String species2) {
		this.petId=pet_id;
		this.name=name2;
		this.age=age2;
		this.breed=breed2;
		this.color=color2;
		this.gender=gender2;
		this.petPicture=petPicPath;
		this.petTrainStatus=petTrainStatus2;
		this.petHealthStatus=healthStatus;
		this.species=species2;
	}
}

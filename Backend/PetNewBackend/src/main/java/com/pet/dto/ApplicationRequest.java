package com.pet.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationRequest {
	private int petId;
    private int userId;
    private String submissionDate;
    private Details details;

    @Getter
    @Setter
    public static class Details {
        private String name;
        private String address;
        private int age;
        private String email;
        private String occupation;
        private String havePet;
        private String petName;
        private String petAge;
        private String petSpecies;
        private String petDescription;
    }
}

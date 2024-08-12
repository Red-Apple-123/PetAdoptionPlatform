package com.pet.service;

import java.util.List;

import com.pet.dto.AppointmentDTO;
import com.pet.entities.Appointment;

public interface IAppointmentService {

	public Appointment createAppointment(Appointment appointment);

	public List<AppointmentDTO> getAllAppointments();
	
	public AppointmentDTO getAppointmentDetails(Long aptId);
	
	public boolean deleteAppointment(Long aptId);
	
	public Appointment updateAppointment(Long aptId, Appointment appointment);
}

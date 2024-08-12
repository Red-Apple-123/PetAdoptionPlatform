package com.pet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pet.dto.AppointmentDTO;
import com.pet.entities.Appointment;
import com.pet.exception.ResourceNotFoundException;
import com.pet.repository.AppointmentRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class AppointmentServiceImpl implements IAppointmentService{

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public Appointment createAppointment(Appointment appointment) {
		return appointmentRepository.save(appointment);
	}

	@Override
	public List<AppointmentDTO> getAllAppointments() {
		return appointmentRepository.findAll() 
				.stream() 
				.map(appt -> mapper.map(appt,AppointmentDTO.class)) 
				.collect(Collectors.toList());
	}

	@Override
	public AppointmentDTO getAppointmentDetails(Long aptId){
		return appointmentRepository.findById(aptId)
				.map(apt -> {
					AppointmentDTO aptDTO = new AppointmentDTO();
					mapper.map(apt,aptDTO);
					return aptDTO;
				})
				.orElse(null);
	}

	@Override
	public boolean deleteAppointment(Long aptId) throws ResourceNotFoundException {
		if (appointmentRepository.existsById(aptId)) {
			appointmentRepository.deleteById(aptId);
			return true;
		}
		return false;
	}

	@Override
	public Appointment updateAppointment(Long aptId, Appointment appointment) {
		return appointmentRepository.findById(aptId).map(existingApt -> {
			existingApt.setAppointmentDate(appointment.getAppointmentDate());
			existingApt.setAppointmentStatus(appointment.getAppointmentStatus());
			existingApt.setAppointmentTime(appointment.getAppointmentTime());
			existingApt.setLocation(appointment.getLocation());
		    return existingApt;
		    }).orElse(null);
	}

}

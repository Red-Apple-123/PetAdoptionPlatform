package com.pet.apiResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse<T> {

	private T data;
	private String message;
	private boolean success;
	
	public ApiResponse(T data, String message, boolean success) {
		this.data=data;
		this.message=message;
		this.success=success;
	}
}

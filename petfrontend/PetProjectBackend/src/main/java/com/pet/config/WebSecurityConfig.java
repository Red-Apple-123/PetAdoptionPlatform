package com.pet.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.pet.security.JWTRequestFilter;

import jakarta.servlet.http.HttpServletResponse;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {
	
	@Autowired
	private JWTRequestFilter filter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().
		exceptionHandling().
		authenticationEntryPoint((request, response, ex) -> {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
		}).
		and().
		authorizeRequests()
		.requestMatchers("/pet/admin/**").hasRole("ADMIN")
		.requestMatchers("/pet/user/**").hasRole("USER")
		.requestMatchers("/pet/shelter/**").hasRole("SHELTER")
		.requestMatchers("/static/**", "/ui/**", "/auth/**", "/swagger*/**", "/v*/api-docs/**", "/favicon.ico/**", "/health").permitAll() // enabling global
		.requestMatchers(HttpMethod.OPTIONS).permitAll().
		anyRequest().permitAll().
		and().
		sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS).
		and()
		.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

		
		
		
//		http
//	        .cors().and()
//	        .csrf().disable()
//	        .exceptionHandling()
//	        .and()
//	        .authorizeHttpRequests(auth -> auth
//	            // Permit all users to access the specified endpoints
//	            .requestMatchers("/api/auth/**", "/api/register", "/swagger-ui/**", "/v3/api-docs/**", "/", "/health").permitAll()
//	            // Allow only users with the ADMIN role to access the /api/admin/** endpoints
//	            .requestMatchers("/api/admin/**").hasRole("ADMIN")
//	            // Allow users with the USER role to access /api/user/** endpoints
//	            .requestMatchers("/api/user/**").hasRole("USER")
//	            // Any other request needs to be authenticated
//	            .anyRequest().authenticated()
//	        );

	    return http.build();
	}

	@Bean
	public AuthenticationManager authenticationMgr(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
	
	//Configuring CORS (Cross-Origin Resource Sharing) in Backend
	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
	                    .allowedOrigins("http://localhost:3000") // React app's URL
	                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                    .allowedHeaders("*")
	                    .allowCredentials(true);
	        }
	    };
	}
}
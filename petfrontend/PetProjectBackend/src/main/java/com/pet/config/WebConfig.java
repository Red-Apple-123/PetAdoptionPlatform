package com.pet.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static content from /ui folder
        registry.addResourceHandler("/ui/**")
                .addResourceLocations("classpath:/static/ui/");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Forward all requests under /ui to /ui/index.html
        registry.addViewController("/ui/**").setViewName("forward:/ui/index.html");
    }
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "https://yourdomain.com") // replace with your actual origins
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
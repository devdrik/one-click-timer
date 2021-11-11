package de.devdrik.oneclicktimer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class OneClickTimerApplication {

	public static void main(String[] args) {
		SpringApplication.run(OneClickTimerApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				// WARNING!!! THIS OPEN THE WHOLE API TO EVERYBODY. DO NOT USE IN PRODUCTION
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("DELETE", "GET", "PUT", "POST", "PATCH");

			}
		};
	}

}

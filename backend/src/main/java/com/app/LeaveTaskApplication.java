package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LeaveTaskApplication {

    public static void main(String[] args) {
        SpringApplication.run(LeaveTaskApplication.class, args);
    }

}
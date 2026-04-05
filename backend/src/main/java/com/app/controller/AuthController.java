package com.app.controller;

import com.app.dto.DTOs.EmployeeRequest;
import com.app.dto.DTOs.LoginRequest;
import com.app.dto.DTOs.LoginResponse;
import com.app.dto.DTOs.EmployeeResponse;
import com.app.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final EmployeeService employeeService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return employeeService.login(request);
    }

    @PostMapping("/register")
    public EmployeeResponse register(@RequestBody EmployeeRequest request) {
        if (request.getRole() == null) {
            request.setRole("EMPLOYEE");
        }
        return employeeService.addEmployee(request);
    }
}
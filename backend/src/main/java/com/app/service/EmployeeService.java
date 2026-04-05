package com.app.service;

import com.app.dto.DTOs.*;
import com.app.exception.BadRequestException;
import com.app.exception.ResourceNotFoundException;
import com.app.model.Employee;
import com.app.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request) {
        Employee employee = employeeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));
        if (!passwordEncoder.matches(request.getPassword(), employee.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }
        return toLoginResponse(employee);
    }

    public EmployeeResponse addEmployee(EmployeeRequest request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        Employee employee = Employee.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .department(request.getDepartment())
                .designation(request.getDesignation())
                .role(request.getRole() != null ? Employee.Role.valueOf(request.getRole()) : Employee.Role.EMPLOYEE)
                .build();
        return toResponse(employeeRepository.save(employee));
    }

    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public EmployeeResponse getEmployee(Long id) {
        return toResponse(findById(id));
    }

    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee employee = findById(id);
        employee.setName(request.getName());
        employee.setDepartment(request.getDepartment());
        employee.setDesignation(request.getDesignation());
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            employee.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getRole() != null) {
            employee.setRole(Employee.Role.valueOf(request.getRole()));
        }
        return toResponse(employeeRepository.save(employee));
    }

    public void deleteEmployee(Long id) {
        findById(id);
        employeeRepository.deleteById(id);
    }

    private Employee findById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    private EmployeeResponse toResponse(Employee e) {
        EmployeeResponse r = new EmployeeResponse();
        r.setId(e.getId());
        r.setName(e.getName());
        r.setEmail(e.getEmail());
        r.setDepartment(e.getDepartment());
        r.setDesignation(e.getDesignation());
        r.setRole(e.getRole().name());
        return r;
    }

    private LoginResponse toLoginResponse(Employee e) {
        LoginResponse r = new LoginResponse();
        r.setId(e.getId());
        r.setName(e.getName());
        r.setEmail(e.getEmail());
        r.setRole(e.getRole().name());
        r.setDepartment(e.getDepartment());
        r.setDesignation(e.getDesignation());
        return r;
    }
}
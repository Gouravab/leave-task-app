package com.app.service;

import com.app.dto.DTOs.*;
import com.app.exception.BadRequestException;
import com.app.exception.ResourceNotFoundException;
import com.app.model.Employee;
import com.app.model.LeaveRequest;
import com.app.repository.EmployeeRepository;
import com.app.repository.LeaveRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveService {

    private final LeaveRequestRepository leaveRepo;
    private final EmployeeRepository employeeRepo;

    public LeaveResponse applyLeave(LeaveRequestDTO dto) {
        Employee employee = employeeRepo.findById(dto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        if (dto.getFromDate().isAfter(dto.getToDate())) {
            throw new BadRequestException("From date cannot be after to date");
        }
        LeaveRequest leave = LeaveRequest.builder()
                .employee(employee)
                .leaveType(dto.getLeaveType())
                .fromDate(dto.getFromDate())
                .toDate(dto.getToDate())
                .reason(dto.getReason())
                .status(LeaveRequest.Status.PENDING)
                .build();
        return toResponse(leaveRepo.save(leave));
    }

    public List<LeaveResponse> getAllLeaves() {
        return leaveRepo.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<LeaveResponse> getLeavesByEmployee(Long employeeId) {
        return leaveRepo.findByEmployeeId(employeeId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public LeaveResponse updateLeaveStatus(Long id, LeaveStatusUpdate update) {
        LeaveRequest leave = leaveRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));
        leave.setStatus(LeaveRequest.Status.valueOf(update.getStatus()));
        return toResponse(leaveRepo.save(leave));
    }

    public void deleteLeave(Long id) {
        leaveRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));
        leaveRepo.deleteById(id);
    }

    private LeaveResponse toResponse(LeaveRequest l) {
        LeaveResponse r = new LeaveResponse();
        r.setId(l.getId());
        r.setEmployeeId(l.getEmployee().getId());
        r.setEmployeeName(l.getEmployee().getName());
        r.setLeaveType(l.getLeaveType());
        r.setFromDate(l.getFromDate());
        r.setToDate(l.getToDate());
        r.setReason(l.getReason());
        r.setStatus(l.getStatus().name());
        r.setCreatedAt(l.getCreatedAt());
        return r;
    }
}
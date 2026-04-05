package com.app.controller;

import com.app.dto.DTOs.LeaveRequestDTO;
import com.app.dto.DTOs.LeaveResponse;
import com.app.dto.DTOs.LeaveStatusUpdate;
import com.app.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    @GetMapping
    public List<LeaveResponse> getAllLeaves() {
        return leaveService.getAllLeaves();
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveResponse> getLeavesByEmployee(@PathVariable Long employeeId) {
        return leaveService.getLeavesByEmployee(employeeId);
    }

    @PostMapping
    public LeaveResponse applyLeave(@RequestBody LeaveRequestDTO leaveRequest) {
        return leaveService.applyLeave(leaveRequest);
    }

    @PutMapping("/{id}/status")
    public LeaveResponse updateLeaveStatus(@PathVariable Long id, @RequestBody LeaveStatusUpdate update) {
        return leaveService.updateLeaveStatus(id, update);
    }

    @DeleteMapping("/{id}")
    public void deleteLeave(@PathVariable Long id) {
        leaveService.deleteLeave(id);
    }
}
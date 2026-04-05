package com.app.controller;

import com.app.dto.DTOs.AdminDashboard;
import com.app.dto.DTOs.EmployeeDashboard;
import com.app.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/admin")
    public AdminDashboard getAdminDashboard() {
        return dashboardService.getAdminDashboard();
    }

    @GetMapping("/employee/{employeeId}")
    public EmployeeDashboard getEmployeeDashboard(@PathVariable Long employeeId) {
        return dashboardService.getEmployeeDashboard(employeeId);
    }
}
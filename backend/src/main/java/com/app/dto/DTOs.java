package com.app.dto;

import com.app.model.Employee;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class DTOs {

    // ---- AUTH ----
    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class LoginResponse {
        private Long id;
        private String name;
        private String email;
        private String role;
        private String department;
        private String designation;
    }

    // ---- EMPLOYEE ----
    @Data
    public static class EmployeeRequest {
        private String name;
        private String email;
        private String password;
        private String department;
        private String designation;
        private String role;
    }

    @Data
    public static class EmployeeResponse {
        private Long id;
        private String name;
        private String email;
        private String department;
        private String designation;
        private String role;
    }

    // ---- LEAVE ----
    @Data
    public static class LeaveRequestDTO {
        private Long employeeId;
        private String leaveType;
        private LocalDate fromDate;
        private LocalDate toDate;
        private String reason;
    }

    @Data
    public static class LeaveResponse {
        private Long id;
        private Long employeeId;
        private String employeeName;
        private String leaveType;
        private LocalDate fromDate;
        private LocalDate toDate;
        private String reason;
        private String status;
        private LocalDateTime createdAt;
    }

    @Data
    public static class LeaveStatusUpdate {
        private String status;
    }

    // ---- TASK ----
    @Data
    public static class TaskRequest {
        private String title;
        private String description;
        private Long assignedEmployeeId;
        private String priority;
        private LocalDate dueDate;
        private String status;
    }

    @Data
    public static class TaskResponse {
        private Long id;
        private String title;
        private String description;
        private Long assignedEmployeeId;
        private String assignedEmployeeName;
        private String priority;
        private LocalDate dueDate;
        private String status;
    }

    @Data
    public static class TaskStatusUpdate {
        private String status;
    }

    // ---- DASHBOARD ----
    @Data
    public static class AdminDashboard {
        private long totalEmployees;
        private long totalTasks;
        private long pendingLeaves;
        private long completedTasks;
    }

    @Data
    public static class EmployeeDashboard {
        private long myTasks;
        private long myLeaves;
        private long pendingApprovals;
    }
}
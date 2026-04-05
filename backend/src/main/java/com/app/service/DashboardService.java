package com.app.service;

import com.app.dto.DTOs.*;
import com.app.model.LeaveRequest;
import com.app.model.Task;
import com.app.repository.EmployeeRepository;
import com.app.repository.LeaveRequestRepository;
import com.app.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EmployeeRepository employeeRepo;
    private final LeaveRequestRepository leaveRepo;
    private final TaskRepository taskRepo;

    public AdminDashboard getAdminDashboard() {
        AdminDashboard d = new AdminDashboard();
        d.setTotalEmployees(employeeRepo.count());
        d.setTotalLeaveRequests(leaveRepo.count());
        d.setPendingLeaveRequests(leaveRepo.countByStatus(LeaveRequest.Status.PENDING));
        d.setTotalTasks(taskRepo.count());
        return d;
    }

    public EmployeeDashboard getEmployeeDashboard(Long employeeId) {
        EmployeeDashboard d = new EmployeeDashboard();
        d.setAssignedTasks(taskRepo.countByAssignedEmployeeId(employeeId));
        d.setCompletedTasks(taskRepo.countByAssignedEmployeeIdAndStatus(employeeId, Task.Status.COMPLETED));
        d.setPendingTasks(taskRepo.countByAssignedEmployeeIdAndStatus(employeeId, Task.Status.PENDING));
        d.setTotalLeaveRequests(leaveRepo.countByEmployeeId(employeeId));
        return d;
    }
}
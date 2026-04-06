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
        d.setTotalEmployees(employeeRepo.findAll().size());
        d.setTotalTasks(taskRepo.findAll().size());
        d.setPendingLeaves((int) leaveRepo.findAll().stream().filter(l -> l.getStatus() == LeaveRequest.Status.PENDING).count());
        d.setCompletedTasks((int) taskRepo.countByStatus(Task.Status.COMPLETED));
        return d;
    }

    public EmployeeDashboard getEmployeeDashboard(Long employeeId) {
        EmployeeDashboard d = new EmployeeDashboard();
        d.setMyTasks(taskRepo.countByAssignedEmployeeId(employeeId));
        d.setMyLeaves(leaveRepo.countByEmployeeId(employeeId));
        d.setPendingApprovals(leaveRepo.countByEmployeeIdAndStatus(employeeId, LeaveRequest.Status.PENDING));
        return d;
    }
}
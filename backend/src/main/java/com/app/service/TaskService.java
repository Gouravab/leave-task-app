package com.app.service;

import com.app.dto.DTOs.*;
import com.app.exception.ResourceNotFoundException;
import com.app.model.Employee;
import com.app.model.Task;
import com.app.repository.EmployeeRepository;
import com.app.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepo;
    private final EmployeeRepository employeeRepo;

    public TaskResponse createTask(TaskRequest request) {
        Employee employee = null;
        if (request.getAssignedEmployeeId() != null) {
            employee = employeeRepo.findById(request.getAssignedEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        }
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .assignedEmployee(employee)
                .priority(request.getPriority() != null ? Task.Priority.valueOf(request.getPriority()) : Task.Priority.MEDIUM)
                .dueDate(request.getDueDate())
                .status(request.getStatus() != null ? Task.Status.valueOf(request.getStatus()) : Task.Status.PENDING)
                .build();
        return toResponse(taskRepo.save(task));
    }

    public List<TaskResponse> getAllTasks() {
        return taskRepo.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getTasksByEmployee(Long employeeId) {
        return taskRepo.findByAssignedEmployeeId(employeeId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public TaskResponse updateTask(Long id, TaskRequest request) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        if (request.getPriority() != null) task.setPriority(Task.Priority.valueOf(request.getPriority()));
        if (request.getStatus() != null) task.setStatus(Task.Status.valueOf(request.getStatus()));
        if (request.getAssignedEmployeeId() != null) {
            Employee emp = employeeRepo.findById(request.getAssignedEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
            task.setAssignedEmployee(emp);
        }
        return toResponse(taskRepo.save(task));
    }

    public TaskResponse updateTaskStatus(Long id, TaskStatusUpdate update) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        task.setStatus(Task.Status.valueOf(update.getStatus()));
        return toResponse(taskRepo.save(task));
    }

    public void deleteTask(Long id) {
        taskRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        taskRepo.deleteById(id);
    }

    private TaskResponse toResponse(Task t) {
        TaskResponse r = new TaskResponse();
        r.setId(t.getId());
        r.setTitle(t.getTitle());
        r.setDescription(t.getDescription());
        r.setPriority(t.getPriority().name());
        r.setDueDate(t.getDueDate());
        r.setStatus(t.getStatus().name());
        if (t.getAssignedEmployee() != null) {
            r.setAssignedEmployeeId(t.getAssignedEmployee().getId());
            r.setAssignedEmployeeName(t.getAssignedEmployee().getName());
        }
        return r;
    }
}
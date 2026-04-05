package com.app.controller;

import com.app.dto.DTOs.TaskRequest;
import com.app.dto.DTOs.TaskResponse;
import com.app.dto.DTOs.TaskStatusUpdate;
import com.app.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskResponse> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/employee/{employeeId}")
    public List<TaskResponse> getTasksByEmployee(@PathVariable Long employeeId) {
        return taskService.getTasksByEmployee(employeeId);
    }

    @PostMapping
    public TaskResponse createTask(@RequestBody TaskRequest taskRequest) {
        return taskService.createTask(taskRequest);
    }

    @PutMapping("/{id}")
    public TaskResponse updateTask(@PathVariable Long id, @RequestBody TaskRequest taskRequest) {
        return taskService.updateTask(id, taskRequest);
    }

    @PutMapping("/{id}/status")
    public TaskResponse updateTaskStatus(@PathVariable Long id, @RequestBody TaskStatusUpdate update) {
        return taskService.updateTaskStatus(id, update);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
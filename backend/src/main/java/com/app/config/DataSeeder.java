package com.app.config;

import com.app.model.Employee;
import com.app.model.LeaveRequest;
import com.app.model.Task;
import com.app.repository.EmployeeRepository;
import com.app.repository.LeaveRequestRepository;
import com.app.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final EmployeeRepository employeeRepo;
    private final LeaveRequestRepository leaveRepo;
    private final TaskRepository taskRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Admin
        Employee admin = Employee.builder()
                .name("Admin User")
                .email("admin@company.com")
                .password(passwordEncoder.encode("admin123"))
                .department("Management")
                .designation("Administrator")
                .role(Employee.Role.ADMIN)
                .build();
        admin = employeeRepo.save(admin);

        // Employees
        Employee emp1 = employeeRepo.save(Employee.builder()
                .name("Alice Johnson")
                .email("alice@company.com")
                .password(passwordEncoder.encode("emp123"))
                .department("Engineering")
                .designation("Software Engineer")
                .role(Employee.Role.EMPLOYEE)
                .build());

        Employee emp2 = employeeRepo.save(Employee.builder()
                .name("Bob Smith")
                .email("bob@company.com")
                .password(passwordEncoder.encode("emp123"))
                .department("HR")
                .designation("HR Manager")
                .role(Employee.Role.EMPLOYEE)
                .build());

        Employee emp3 = employeeRepo.save(Employee.builder()
                .name("Carol Davis")
                .email("carol@company.com")
                .password(passwordEncoder.encode("emp123"))
                .department("Engineering")
                .designation("QA Engineer")
                .role(Employee.Role.EMPLOYEE)
                .build());

        // Leave Requests
        leaveRepo.save(LeaveRequest.builder()
                .employee(emp1)
                .leaveType("Sick Leave")
                .fromDate(LocalDate.now().plusDays(2))
                .toDate(LocalDate.now().plusDays(3))
                .reason("Not feeling well")
                .status(LeaveRequest.Status.PENDING)
                .build());

        leaveRepo.save(LeaveRequest.builder()
                .employee(emp2)
                .leaveType("Casual Leave")
                .fromDate(LocalDate.now().plusDays(5))
                .toDate(LocalDate.now().plusDays(6))
                .reason("Personal work")
                .status(LeaveRequest.Status.APPROVED)
                .build());

        leaveRepo.save(LeaveRequest.builder()
                .employee(emp3)
                .leaveType("Annual Leave")
                .fromDate(LocalDate.now().plusDays(10))
                .toDate(LocalDate.now().plusDays(15))
                .reason("Family vacation")
                .status(LeaveRequest.Status.PENDING)
                .build());

        // Tasks
        taskRepo.save(Task.builder()
                .title("Build Login Module")
                .description("Implement authentication for the web app")
                .assignedEmployee(emp1)
                .priority(Task.Priority.HIGH)
                .dueDate(LocalDate.now().plusDays(7))
                .status(Task.Status.IN_PROGRESS)
                .build());

        taskRepo.save(Task.builder()
                .title("Write Unit Tests")
                .description("Cover service layer with JUnit tests")
                .assignedEmployee(emp1)
                .priority(Task.Priority.MEDIUM)
                .dueDate(LocalDate.now().plusDays(10))
                .status(Task.Status.PENDING)
                .build());

        taskRepo.save(Task.builder()
                .title("Database Design")
                .description("Design ER diagram and SQL schema")
                .assignedEmployee(emp3)
                .priority(Task.Priority.HIGH)
                .dueDate(LocalDate.now().plusDays(3))
                .status(Task.Status.COMPLETED)
                .build());

        taskRepo.save(Task.builder()
                .title("Onboarding Documentation")
                .description("Prepare onboarding guide for new hires")
                .assignedEmployee(emp2)
                .priority(Task.Priority.LOW)
                .dueDate(LocalDate.now().plusDays(14))
                .status(Task.Status.PENDING)
                .build());

        System.out.println("✅ Dummy data seeded!");
        System.out.println("   Admin: admin@company.com / admin123");
        System.out.println("   Employee: alice@company.com / emp123");
    }
}
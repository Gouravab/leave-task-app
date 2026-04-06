package com.app.repository;

import com.app.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);
    long countByStatus(LeaveRequest.Status status);
    long countByEmployeeId(Long employeeId);
    long countByEmployeeIdAndStatus(Long employeeId, LeaveRequest.Status status);
}
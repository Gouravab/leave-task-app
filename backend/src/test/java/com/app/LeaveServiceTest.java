package com.app;

import com.app.service.LeaveService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LeaveServiceTest {

    @Autowired
    private LeaveService leaveService;

    @Test
    public void testService() {
        // Test logic
    }
}
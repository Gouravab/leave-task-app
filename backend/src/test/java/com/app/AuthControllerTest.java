package com.app;

import com.app.controller.AuthController;
import com.app.dto.DTOs.LoginResponse;
import com.app.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;

    @Test
    public void testLogin() throws Exception {
        LoginResponse response = new LoginResponse();
        response.setId(1L);
        response.setName("Admin User");
        response.setEmail("admin@company.com");
        response.setRole("ADMIN");
        response.setDepartment("Management");
        response.setDesignation("Administrator");

        when(employeeService.login(any())).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"admin@company.com\",\"password\":\"admin123\"}"))
                .andExpect(status().isOk());
    }
}
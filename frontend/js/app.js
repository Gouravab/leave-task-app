// API base URL
const API_BASE = 'http://localhost:8080/api';

// Auth helpers
function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function clearUser() {
    localStorage.removeItem('user');
}

// HTTP helpers
async function apiGet(endpoint) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

async function apiPost(endpoint, data) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

async function apiPut(endpoint, data) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

async function apiDelete(endpoint) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

// UI helpers
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) return;
    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => hideAlert(), 5000);
}

function hideAlert() {
    const alertContainer = document.getElementById('alert-container');
    if (alertContainer) alertContainer.innerHTML = '';
}

function renderDashboardCards(stats) {
    const container = document.getElementById('dashboard-cards');
    if (!container) return;
    container.innerHTML = `
        <div class="stat-card">
            <h3>Total Employees</h3>
            <p>${stats.totalEmployees}</p>
        </div>
        <div class="stat-card">
            <h3>Total Tasks</h3>
            <p>${stats.totalTasks}</p>
        </div>
        <div class="stat-card">
            <h3>Pending Leaves</h3>
            <p>${stats.pendingLeaves}</p>
        </div>
        <div class="stat-card">
            <h3>Completed Tasks</h3>
            <p>${stats.completedTasks}</p>
        </div>
    `;
}

function renderEmployeeDashboard(stats) {
    const container = document.getElementById('employee-dashboard-cards');
    if (!container) return;
    container.innerHTML = `
        <div class="stat-card">
            <h3>My Tasks</h3>
            <p>${stats.myTasks}</p>
        </div>
        <div class="stat-card">
            <h3>My Leaves</h3>
            <p>${stats.myLeaves}</p>
        </div>
        <div class="stat-card">
            <h3>Pending Approvals</h3>
            <p>${stats.pendingApprovals}</p>
        </div>
    `;
}

function renderEmployeeTable(employees) {
    const tbody = document.getElementById('employeeTableBody');
    if (!tbody) return;
    tbody.innerHTML = employees.map(emp => `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.designation}</td>
            <td>${emp.role}</td>
        </tr>
    `).join('');
}

function renderLeaveRequests(leaves) {
    const container = document.getElementById('leaveRequests');
    if (!container) return;
    container.innerHTML = leaves.map(leave => `
        <div class="leave-card">
            <p><strong>${leave.employeeName}</strong> - ${leave.leaveType}</p>
            <p>${leave.startDate} to ${leave.endDate}</p>
            <p>Reason: ${leave.reason}</p>
            <p>Status: ${leave.status}</p>
            <button onclick="approveLeave(${leave.id})">Approve</button>
            <button onclick="rejectLeave(${leave.id})">Reject</button>
        </div>
    `).join('');
}

function renderTaskList(tasks) {
    const container = document.getElementById('taskList');
    if (!container) return;
    container.innerHTML = tasks.map(task => `
        <div class="task-card">
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <p>Assigned to: ${task.assignedToName}</p>
            <p>Due: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <p>Status: ${task.status}</p>
            <select onchange="updateTaskStatus(${task.id}, this.value)">
                <option value="PENDING" ${task.status === 'PENDING' ? 'selected' : ''}>Pending</option>
                <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
                <option value="COMPLETED" ${task.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
            </select>
        </div>
    `).join('');
}

function renderMyLeaves(leaves) {
    const container = document.getElementById('myLeaveHistory');
    if (!container) return;
    container.innerHTML = leaves.map(leave => `
        <div class="leave-card">
            <p>${leave.leaveType} - ${leave.startDate} to ${leave.endDate}</p>
            <p>Reason: ${leave.reason}</p>
            <p>Status: ${leave.status}</p>
        </div>
    `).join('');
}

function renderMyTasks(tasks) {
    const container = document.getElementById('myTaskList');
    if (!container) return;
    container.innerHTML = tasks.map(task => `
        <div class="task-card">
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <p>Due: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <p>Status: ${task.status}</p>
            <select onchange="updateMyTaskStatus(${task.id}, this.value)">
                <option value="PENDING" ${task.status === 'PENDING' ? 'selected' : ''}>Pending</option>
                <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
                <option value="COMPLETED" ${task.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
            </select>
        </div>
    `).join('');
}

// Page loaders
async function loadAdminDashboard() {
    try {
        const stats = await apiGet('/dashboard/admin');
        renderDashboardCards(stats);
    } catch (error) {
        showAlert('Failed to load dashboard: ' + error.message, 'error');
    }
}

async function loadEmployeeDashboard() {
    const user = getUser();
    if (!user) return;
    try {
        const stats = await apiGet(`/dashboard/employee/${user.id}`);
        renderEmployeeDashboard(stats);
    } catch (error) {
        showAlert('Failed to load dashboard: ' + error.message, 'error');
    }
}

async function loadEmployees() {
    try {
        const employees = await apiGet('/employees');
        renderEmployeeTable(employees);
    } catch (error) {
        showAlert('Failed to load employees: ' + error.message, 'error');
    }
}

async function loadLeaveRequests() {
    try {
        const leaves = await apiGet('/leaves');
        renderLeaveRequests(leaves);
    } catch (error) {
        showAlert('Failed to load leave requests: ' + error.message, 'error');
    }
}

async function loadTasks() {
    try {
        const tasks = await apiGet('/tasks');
        renderTaskList(tasks);
    } catch (error) {
        showAlert('Failed to load tasks: ' + error.message, 'error');
    }
}

async function populateEmployeeSelect() {
    try {
        const employees = await apiGet('/employees');
        const select = document.getElementById('assignedTo');
        if (!select) return;
        select.innerHTML = '<option value="">Select Employee</option>';
        employees.forEach(emp => {
            const option = document.createElement('option');
            option.value = emp.id;
            option.textContent = emp.name;
            select.appendChild(option);
        });
    } catch (error) {
        showAlert('Failed to load employees: ' + error.message, 'error');
    }
}

async function loadMyLeaves() {
    const user = getUser();
    if (!user) return;
    try {
        const leaves = await apiGet(`/leaves/employee/${user.id}`);
        renderMyLeaves(leaves);
    } catch (error) {
        showAlert('Failed to load my leaves: ' + error.message, 'error');
    }
}

async function loadMyTasks() {
    const user = getCurrentUser();
    if (!user) return;
    try {
        const tasks = await apiGet(`/tasks/employee/${user.id}`);
        renderMyTasks(tasks);
    } catch (error) {
        showAlert('Failed to load my tasks: ' + error.message, 'error');
    }
}

// Event handlers
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await apiPost('/auth/login', { email, password });
        setUser(response);
        const user = getUser();
        if (user.role === 'ADMIN') {
            window.location.href = 'pages/admin-dashboard.html';
        } else {
            window.location.href = 'pages/employee-dashboard.html';
        }
    } catch (error) {
        showAlert('Login failed: ' + error.message, 'error');
    }
}

async function handleAddEmployee(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;
    const designation = document.getElementById('designation').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    try {
        await apiPost('/employees', { name, email, department, designation, role, password });
        showAlert('Employee added successfully', 'success');
        loadEmployees();
    } catch (error) {
        showAlert('Failed to add employee: ' + error.message, 'error');
    }
}

async function handleLeaveRequest(event) {
    event.preventDefault();
    const leaveType = document.getElementById('leaveType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const reason = document.getElementById('reason').value;
    try {
        await apiPost('/leaves', { leaveType, startDate, endDate, reason });
        showAlert('Leave request submitted', 'success');
        loadMyLeaves();
    } catch (error) {
        showAlert('Failed to submit leave: ' + error.message, 'error');
    }
}

async function handleTaskCreation(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const assignedToId = document.getElementById('assignedTo').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    try {
        await apiPost('/tasks', { title, description, assignedToId, dueDate, priority });
        showAlert('Task created successfully', 'success');
        loadTasks();
    } catch (error) {
        showAlert('Failed to create task: ' + error.message, 'error');
    }
}

async function approveLeave(id) {
    try {
        await apiPut(`/leaves/${id}/status`, { status: 'APPROVED' });
        showAlert('Leave approved', 'success');
        loadLeaveRequests();
    } catch (error) {
        showAlert('Failed to approve leave: ' + error.message, 'error');
    }
}

async function rejectLeave(id) {
    try {
        await apiPut(`/leaves/${id}/status`, { status: 'REJECTED' });
        showAlert('Leave rejected', 'success');
        loadLeaveRequests();
    } catch (error) {
        showAlert('Failed to reject leave: ' + error.message, 'error');
    }
}

async function updateTaskStatus(id, status) {
    try {
        await apiPut(`/tasks/${id}/status`, { status });
        showAlert('Task status updated', 'success');
        loadTasks();
    } catch (error) {
        showAlert('Failed to update task: ' + error.message, 'error');
    }
}

async function updateMyTaskStatus(id, status) {
    try {
        await apiPut(`/tasks/${id}/status`, { status });
        showAlert('Task status updated', 'success');
        loadMyTasks();
    } catch (error) {
        showAlert('Failed to update task: ' + error.message, 'error');
    }
}

function logout() {
    clearUser();
    window.location.href = '../index.html';
}

// Init page
function initPage() {
    const path = window.location.pathname;
    const user = getUser();
    if (user) {
        const userNameEl = document.getElementById('user-name');
        const userRoleEl = document.getElementById('user-role');
        const userInitialsEl = document.getElementById('user-initials');
        if (userNameEl) userNameEl.textContent = user.name;
        if (userRoleEl) userRoleEl.textContent = user.role;
        if (userInitialsEl) userInitialsEl.textContent = user.name.charAt(0).toUpperCase();
    }
    if (path.includes('admin-dashboard.html')) {
        loadAdminDashboard();
    } else if (path.includes('employee-dashboard.html')) {
        loadEmployeeDashboard();
    } else if (path.includes('employees.html')) {
        loadEmployees();
        document.getElementById('newEmployeeForm').addEventListener('submit', handleAddEmployee);
    } else if (path.includes('leave-approval.html')) {
        loadLeaveRequests();
    } else if (path.includes('task-assignment.html')) {
        loadTasks();
        populateEmployeeSelect();
        document.getElementById('taskForm').addEventListener('submit', handleTaskCreation);
    } else if (path.includes('leave-request.html')) {
        loadMyLeaves();
        document.getElementById('leaveForm').addEventListener('submit', handleLeaveRequest);
    } else if (path.includes('task-status.html')) {
        loadMyTasks();
    } else if (path.includes('index.html')) {
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    }
}

// Run init on load
document.addEventListener('DOMContentLoaded', initPage);
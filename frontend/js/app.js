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

    const completionRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;

    container.innerHTML = `
        <div class="stat-card card-employees">
            <div class="card-icon">👥</div>
            <div class="card-content">
                <h3>Total Employees</h3>
                <p class="card-value">${stats.totalEmployees}</p>
                <div class="card-trend">Active workforce</div>
            </div>
        </div>
        <div class="stat-card card-tasks">
            <div class="card-icon">📋</div>
            <div class="card-content">
                <h3>Task Management</h3>
                <p class="card-value">${stats.totalTasks}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${completionRate}%"></div>
                </div>
                <div class="card-trend">${completionRate}% completed</div>
            </div>
        </div>
        <div class="stat-card card-leaves">
            <div class="card-icon">🏖️</div>
            <div class="card-content">
                <h3>Pending Leaves</h3>
                <p class="card-value">${stats.pendingLeaves}</p>
                <div class="card-trend">Awaiting approval</div>
            </div>
        </div>
        <div class="stat-card card-completed">
            <div class="card-icon">✅</div>
            <div class="card-content">
                <h3>Completed Tasks</h3>
                <p class="card-value">${stats.completedTasks}</p>
                <div class="card-trend">Successfully finished</div>
            </div>
        </div>
    `;

    // Add recent activities section
    const detailsContainer = document.getElementById('dashboard-details');
    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <div class="analytics-section">
                <h2>Quick Analytics</h2>
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <h4>Task Distribution</h4>
                        <div class="metric">
                            <span class="metric-label">Pending Tasks:</span>
                            <span class="metric-value">${stats.totalTasks - stats.completedTasks}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Completion Rate:</span>
                            <span class="metric-value">${completionRate}%</span>
                        </div>
                    </div>
                    <div class="analytics-card">
                        <h4>Leave Overview</h4>
                        <div class="metric">
                            <span class="metric-label">Pending Requests:</span>
                            <span class="metric-value">${stats.pendingLeaves}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Approval Rate:</span>
                            <span class="metric-value">85%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function renderEmployeeDashboard(stats, tasks) {
    const container = document.getElementById('dashboard-cards');
    if (!container) return;

    // Calculate task completion rate
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
    const completionRate = stats.myTasks > 0 ? Math.round((completedTasks / stats.myTasks) * 100) : 0;

    container.innerHTML = `
        <div class="stat-card card-tasks">
            <div class="card-icon">📋</div>
            <div class="card-content">
                <h3>My Tasks</h3>
                <p class="card-value">${stats.myTasks}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${completionRate}%"></div>
                </div>
                <div class="card-trend">${completionRate}% completed</div>
            </div>
        </div>
        <div class="stat-card card-leaves">
            <div class="card-icon">📅</div>
            <div class="card-content">
                <h3>Leave Requests</h3>
                <p class="card-value">${stats.myLeaves}</p>
                <div class="card-trend">Total submitted</div>
            </div>
        </div>
        <div class="stat-card card-pending">
            <div class="card-icon">⏳</div>
            <div class="card-content">
                <h3>Pending Approvals</h3>
                <p class="card-value">${stats.pendingApprovals}</p>
                <div class="card-trend">Awaiting decision</div>
            </div>
        </div>
    `;

    const detailsContainer = document.getElementById('dashboard-details');
    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <div class="analytics-section">
                <h2>My Performance</h2>
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <h4>Task Progress</h4>
                        <div class="metric">
                            <span class="metric-label">Completed:</span>
                            <span class="metric-value">${completedTasks}/${stats.myTasks}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">In Progress:</span>
                            <span class="metric-value">${tasks.filter(t => t.status === 'IN_PROGRESS').length}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Pending:</span>
                            <span class="metric-value">${tasks.filter(t => t.status === 'PENDING').length}</span>
                        </div>
                    </div>
                    <div class="analytics-card">
                        <h4>Leave Status</h4>
                        <div class="metric">
                            <span class="metric-label">Total Requests:</span>
                            <span class="metric-value">${stats.myLeaves}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Pending:</span>
                            <span class="metric-value">${stats.pendingApprovals}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Approved:</span>
                            <span class="metric-value">${stats.myLeaves - stats.pendingApprovals}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="leave-card">
                <div class="card-header">
                    <h4>Recent Tasks</h4>
                </div>
                <div class="card-details">
                    ${tasks.slice(0, 5).map(task => `
                        <div class="task-item">
                            <div class="task-info">
                                <strong>${task.title}</strong>
                                <span class="task-status status-${task.status.toLowerCase()}">${task.status.replace('_', ' ')}</span>
                            </div>
                            <div class="task-actions">
                                <select onchange="updateMyTaskStatus(${task.id}, this.value)">
                                    <option value="PENDING" ${task.status === 'PENDING' ? 'selected' : ''}>Pending</option>
                                    <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
                                    <option value="COMPLETED" ${task.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
                                </select>
                            </div>
                        </div>
                    `).join('')}
                    <p><a href="task-status.html">View all tasks</a></p>
                </div>
            </div>
        `;
    }
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
            <div class="card-header">
                <h4>${leave.employeeName} - ${leave.leaveType}</h4>
                <span class="status-badge status-${leave.status.toLowerCase()}">${leave.status}</span>
            </div>
            <div class="card-details">
                <p><strong>Dates:</strong> ${leave.fromDate} to ${leave.toDate}</p>
                <p><strong>Reason:</strong> ${leave.reason}</p>
                <p><strong>Requested on:</strong> ${new Date(leave.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="card-actions">
                <button class="btn btn-success btn-sm" onclick="approveLeave(${leave.id})">Approve</button>
                <button class="btn btn-danger btn-sm" onclick="rejectLeave(${leave.id})">Reject</button>
            </div>
        </div>
    `).join('');
}

function renderTaskList(tasks) {
    const container = document.getElementById('taskList');
    if (!container) return;
    container.innerHTML = tasks.map(task => `
        <div class="task-card">
            <div class="card-header">
                <h4>${task.title}</h4>
                <span class="status-badge status-${task.status.toLowerCase()}">${task.status.replace('_', ' ')}</span>
            </div>
            <div class="card-details">
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Assigned to:</strong> ${task.assignedEmployeeName || 'Unassigned'}</p>
                <p><strong>Due:</strong> ${task.dueDate}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
            </div>
            <div class="card-actions">
                <select onchange="updateTaskStatus(${task.id}, this.value)">
                    <option value="PENDING" ${task.status === 'PENDING' ? 'selected' : ''}>Pending</option>
                    <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
                    <option value="COMPLETED" ${task.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
                </select>
            </div>
        </div>
    `).join('');
}

function renderMyLeaves(leaves) {
    const container = document.getElementById('myLeaveHistory');
    if (!container) return;
    container.innerHTML = leaves.map(leave => `
        <div class="leave-card">
            <div class="card-header">
                <h4>${leave.leaveType} Leave</h4>
                <span class="status-badge status-${leave.status.toLowerCase()}">${leave.status}</span>
            </div>
            <div class="card-details">
                <p><strong>Dates:</strong> ${leave.fromDate} to ${leave.toDate}</p>
                <p><strong>Reason:</strong> ${leave.reason}</p>
            </div>
        </div>
    `).join('');
}

function renderMyTasks(tasks) {
    const container = document.getElementById('myTaskList');
    if (!container) return;
    container.innerHTML = tasks.map(task => `
        <div class="task-card">
            <div class="card-header">
                <h4>${task.title}</h4>
                <span class="status-badge status-${task.status.toLowerCase()}">${task.status.replace('_', ' ')}</span>
            </div>
            <div class="card-details">
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Due:</strong> ${task.dueDate}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
            </div>
            <div class="card-actions">
                <select onchange="updateMyTaskStatus(${task.id}, this.value)">
                    <option value="PENDING" ${task.status === 'PENDING' ? 'selected' : ''}>Pending</option>
                    <option value="IN_PROGRESS" ${task.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
                    <option value="COMPLETED" ${task.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
                </select>
            </div>
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
        const tasks = await apiGet(`/tasks/employee/${user.id}`);
        renderEmployeeDashboard(stats, tasks);
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
    const user = getUser();
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
    const user = getUser();
    if (!user) {
        showAlert('User not logged in', 'error');
        return;
    }
    const leaveType = document.getElementById('leaveType').value;
    const fromDate = document.getElementById('startDate').value;
    const toDate = document.getElementById('endDate').value;
    const reason = document.getElementById('reason').value;
    try {
        await apiPost('/leaves', { employeeId: user.id, leaveType, fromDate, toDate, reason });
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
    const assignedEmployeeId = document.getElementById('assignedTo').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    try {
        await apiPost('/tasks', { title, description, assignedEmployeeId, dueDate, priority });
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
        setInterval(loadAdminDashboard, 10000); // Auto-refresh every 10 seconds
    } else if (path.includes('employee-dashboard.html')) {
        loadEmployeeDashboard();
        setInterval(loadEmployeeDashboard, 10000); // Auto-refresh every 10 seconds
    } else if (path.includes('employees.html')) {
        loadEmployees();
        document.getElementById('newEmployeeForm').addEventListener('submit', handleAddEmployee);
    } else if (path.includes('leave-approval.html')) {
        loadLeaveRequests();
        setInterval(loadLeaveRequests, 10000); // Auto-refresh every 10 seconds
    } else if (path.includes('task-assignment.html')) {
        loadTasks();
        setInterval(loadTasks, 10000); // Auto-refresh every 10 seconds
        populateEmployeeSelect();
        document.getElementById('taskForm').addEventListener('submit', handleTaskCreation);
    } else if (path.includes('leave-request.html')) {
        loadMyLeaves();
        setInterval(loadMyLeaves, 10000); // Auto-refresh every 10 seconds
        document.getElementById('leaveForm').addEventListener('submit', handleLeaveRequest);
    } else if (path.includes('task-status.html')) {
        loadMyTasks();
        setInterval(loadMyTasks, 10000); // Auto-refresh every 10 seconds
    } else if (path.includes('index.html')) {
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    }
}

// Run init on load
document.addEventListener('DOMContentLoaded', initPage);
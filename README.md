# 📋 Leave Task App

A comprehensive full-stack application for managing employees, leave requests, and task assignments. Built with Spring Boot backend and vanilla JavaScript frontend, this system streamlines HR operations and workforce management.

## 🌟 Features

### Employee Management
- ✅ Create, read, update, and delete employee records
- 👤 Employee profile management with role-based access
- 📊 Employee directory with search and filter capabilities

### Leave Management
- 📅 Submit and track leave requests
- ✔️ Approve or reject leave applications
- 📈 Leave balance tracking and history
- 🔔 Automated leave status notifications

### Task Management
- 📝 Create and assign tasks to employees
- 🎯 Task status tracking (Pending, In Progress, Completed)
- 📌 Priority-based task organization
- ⏰ Deadline management and reminders

## 🏗️ Architecture

```
leave-task-app/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/yourpackage/
│   │   │   │       ├── controller/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
└── frontend/
    ├── index.html
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## 🛠️ Technology Stack

### Backend
- **Framework:** Spring Boot 3.5.13
- **Language:** Java 21
- **Build Tool:** Maven
- **Database:** [Specify your database - H2/MySQL/PostgreSQL]
- **Security:** Spring Security with JWT (if applicable)
- **API Documentation:** Swagger/OpenAPI (if implemented)

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with responsive design
- **JavaScript (ES6+)** - Vanilla JS for dynamic interactions
- **Fetch API** - RESTful API communication

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Java Development Kit (JDK) 21** or higher
  ```bash
  java -version
  ```
  
- **Apache Maven 3.6+**
  ```bash
  mvn -version
  ```

- **Git** (for cloning the repository)
  ```bash
  git --version
  ```

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/Gouravab/leave-task-app.git
cd leave-task-app
```

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   mvn clean install
   ```

3. **Configure the database** (if applicable):
   
   Edit `src/main/resources/application.properties`:
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/leave_task_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   
   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```

4. **Run the backend server:**
   ```bash
   mvn spring-boot:run
   ```
   
   The backend server will start at `http://localhost:8080`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Open the application:**
   
   Simply open `index.html` in your web browser:
   ```bash
   # Using default browser on macOS
   open index.html
   
   # Using default browser on Linux
   xdg-open index.html
   
   # Using default browser on Windows
   start index.html
   ```
   
   Or use a local development server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 3000
   
   # Using Node.js http-server
   npx http-server -p 3000
   ```
   
   Access the frontend at `http://localhost:3000`

## 📖 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### Employee Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| GET | `/employees/{id}` | Get employee by ID |
| POST | `/employees` | Create new employee |
| PUT | `/employees/{id}` | Update employee |
| DELETE | `/employees/{id}` | Delete employee |

#### Leave Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/leaves` | Get all leave requests |
| GET | `/leaves/{id}` | Get leave request by ID |
| POST | `/leaves` | Submit leave request |
| PUT | `/leaves/{id}` | Update leave request |
| DELETE | `/leaves/{id}` | Delete leave request |
| PATCH | `/leaves/{id}/approve` | Approve leave request |
| PATCH | `/leaves/{id}/reject` | Reject leave request |

#### Task Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/{id}` | Get task by ID |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/{id}` | Update task |
| DELETE | `/tasks/{id}` | Delete task |
| PATCH | `/tasks/{id}/status` | Update task status |

### Sample Request

```bash
# Create a new employee
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Engineering",
    "role": "Software Developer"
  }'
```

## 🎯 Usage Guide

### Login
1. Open the frontend application
2. Enter your credentials (default admin credentials if applicable)
3. Click "Login"

### Managing Employees
1. Navigate to the "Employees" section
2. Click "Add Employee" to create a new employee record
3. Fill in the required details and submit
4. Edit or delete existing employees as needed

### Managing Leave Requests
1. Navigate to the "Leave Management" section
2. Click "Request Leave" to submit a new leave application
3. Select leave type, dates, and provide reason
4. Managers can approve/reject pending requests

### Managing Tasks
1. Navigate to the "Tasks" section
2. Click "Create Task" to assign a new task
3. Select assignee, set priority and deadline
4. Track task progress and update status

## 🔧 Configuration

### Application Properties

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Logging
logging.level.root=INFO
logging.level.com.yourpackage=DEBUG
```

## 🧪 Testing

### Run Backend Tests

```bash
cd backend
mvn test
```

### Run Test Coverage

```bash
mvn clean test jacoco:report
```

View coverage report at `target/site/jacoco/index.html`

## 🐛 Troubleshooting

### Common Issues

**Issue: "Java version not found"**
```bash
# Solution: Install Java 21
# Download from: https://adoptium.net/
# Verify installation:
java -version
```

**Issue: "Maven command not found"**
```bash
# Solution: Install Maven
# Download from: https://maven.apache.org/download.cgi
# Or use package manager:
# macOS: brew install maven
# Ubuntu: sudo apt install maven
# Windows: choco install maven
```

**Issue: "Port 8080 already in use"**
```bash
# Solution: Change port in application.properties
server.port=8081

# Or kill the process using port 8080
# Linux/macOS:
lsof -ti:8080 | xargs kill -9
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Issue: "CORS errors in frontend"**
```bash
# Solution: Add CORS configuration in Spring Boot
# Create a WebConfig class with CORS mappings
```

**Issue: "Database connection failed"**
```bash
# Solution: Verify database is running and credentials are correct
# Check application.properties settings
# Ensure database exists
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow Java naming conventions
- Write meaningful commit messages
- Add unit tests for new features
- Update documentation as needed


**⭐ Star this repository if you find it helpful!**

*Last Updated: May 2026*

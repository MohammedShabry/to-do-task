# 📝 Full Stack To-Do Task Application

A simple full-stack task management web app where users can create, view, and complete tasks.  
Built with **MySQL**, **Node.js (Express)**, **React**, and **Docker**.

---

## 📦 Tech Stack

- **Frontend**: React (Single Page Application)
- **Backend**: Node.js + Express
- **Database**: MySQL 8
- **Containerization**: Docker & Docker Compose
- **Testing**:
  - Backend: Jest (unit & integration tests)
  - Frontend: React Testing Library

---

## 🛠️ Features

- Create tasks with a title and description
- View the latest **5 uncompleted** tasks
- Mark tasks as **completed**
- Completed tasks are removed from the main view
- RESTful API
- Fully containerized using Docker Compose

---

## 🚀 Getting Started

### 🧰 Prerequisites

- Docker & Docker Compose
- Git 

---

### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

---

### 🐳 Run the App with Docker Compose

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:5000

---

## 🌐 API Endpoints

| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| GET    | `/tasks`               | Get latest 5 uncompleted tasks   |
| POST   | `/tasks`               | Add a new task                   |
| PUT    | `/tasks/:id/complete`  | Mark a task as completed         |

---

## 🧪 Running Tests

### ✅ Backend Tests

```bash
cd backend
npm install
npm test
```

### ✅ Frontend Tests

```bash
cd frontend
npm install
npm test
```

---

---

## 🧹 Best Practices

- Followed **SOLID principles** in backend
- Separated logic using **controllers** and **models**
- Dockerized all services for easy deployment
- Unit and integration tests included

---


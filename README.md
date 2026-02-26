# HRMS Lite (Human Resource Management System)

HRMS Lite is a lightweight Human Resource Management System built using **Django REST Framework** and a **React + TypeScript frontend**.
It allows organizations to manage employees, track attendance, and view dashboard insights.

This project demonstrates a production-ready full-stack deployment using cloud hosting and PostgreSQL.

---

## 🚀 Project Overview

HRMS Lite provides:

* Employee management
* Attendance tracking
* Dashboard statistics
* Admin management panel
* REST API access
* Cloud deployment

---

## 🛠 Tech Stack Used

### 🔹 Frontend

* React.js
* TypeScript (TSX)
* Tailwind CSS
* Axios
* Vercel (Deployment)

### 🔹 Backend

* Django
* Django REST Framework
* Gunicorn
* Render (Deployment)

### 🔹 Database

* PostgreSQL (Production)
* SQLite / PostgreSQL (Local)

### 🔹 Tools & Services

* Git & GitHub
* Render Cloud Platform
* Vercel Hosting

---

## ⚙️ Running the Project Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/bapubiswa/hrms-lite.git
cd hrms-lite
```

---

## 🧩 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate     # Windows
source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
```

---

### 🗄 Configure Database

If using PostgreSQL locally:

Create a `.env` file inside **backend/**:

```
NAME_OF_VARIABLE=postgresql://USER:PASSWORD@localhost:5432/hrms_db
```

Run migrations:

```bash
python manage.py migrate
```

Create admin:

```bash
python manage.py createsuperuser
```

Start backend:

```bash
python manage.py runserver
```

Backend runs at:

👉 http://127.0.0.1:8000/

---

## 🎨 Frontend Setup (React + TypeScript)

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

👉 http://localhost:3000

---

## 🌍 Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://127.0.0.1:8000
```

### Production (Vercel)

```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 🔑 Admin Panel

👉 http://127.0.0.1:8000/admin/

Login using the superuser credentials.

---

## 📡 API Endpoints

* `/api/employees/`
* `/api/attendance/`
* `/api/dashboard/`

---

## ⚠️ Assumptions & Limitations

* Free hosting may cause initial delay (cold start).
* PostgreSQL is used in production.
* Authentication is not implemented (can be extended).
* Designed for learning and demonstration purposes.

---

## 🧭 Usage Flow

To use the system correctly:

1. **Create Employees** from the admin panel or employee API.
2. **Add Attendance** records linked to existing employees.
3. View aggregated data in the **Dashboard API**.

---
## 🌐 Live Demo

URL- https://hrms-lite-ivory-six.vercel.app/

---

## 👨‍💻 Author

**Biswajeet Das**
Full-Stack Developer (Django | React | TypeScript)

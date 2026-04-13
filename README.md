# 🚀 Kazi Connect – Job Marketplace API

Kazi Connect is a job marketplace platform that connects employers and job seekers, enabling emloyers to post jobs and manage applicants while allowing usrs to apply, track applications and discover opportunities.

This project is built with FastAPI and deployed on Render, using MongoDB Atlas for cloud database storage.

---

## 🌐 Live API

* **Base URL:** https://kazi-connect-backend.onrender.com
* **API Docs (Swagger):** https://kazi-connect-backend.onrender.com/docs

---

## ⚙️ Tech Stack

* **Backend:** FastAPI (Python)
* **Database:** MongoDB Atlas
* **Authentication:** JWT (JSON Web Tokens)
* **Deployment:** Render
* **Async DB Driver:** Motor

---

## 🔐 Features

### Authentication

* User registration (job seeker / employer)
* Secure login with JWT tokens
* Token-based protected routes

### Jobs

* Employers can create job listings
* Public job browsing
* Pagination, search, filtering, sorting

### Applications

* Job seekers can apply to jobs
* Prevent duplicate applications
* Employers can view applicants
* Employers can accept/reject applications
* Job seekers can track application status

---

## 📦 Project Structure

```
backend/
│
├── main.py
├── routes/
├── services/
├── models/
├── database/
└── utils/
```

---

## 🧪 API Usage

### 1. Register

`POST /register`

### 2. Login

`POST /login`

👉 Copy the token from the response.

---

### 3. Authorize

Click **Authorize** in Swagger and enter:

```
Bearer YOUR_TOKEN
```

---

### 4. Example Protected Routes

* Create Job → `POST /jobs`
* Apply to Job → `POST /applications`
* View Jobs → `GET /jobs`

---

## 🛠️ Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/kazi-connect.git
cd kazi-connect/backend
```

### 2. Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Create `.env`

```env
MONGO_URL=your_mongodb_connection_string
DB_NAME=kazi_connect
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 5. Run server

```bash
uvicorn main:app --reload
```

---

## 🔐 Security Notes

* Environment variables are used for sensitive data
* JWT is used for authentication
* Role-based access control enforced (employer vs job seeker)
* MongoDB access restricted via Atlas security settings

---

## 🚧 Future Improvements

* Add rate limiting
* Add logging and monitoring
* Add email notifications
* Add frontend (React)
* Improve role-based authorization granularity

---

## 👤 Author

**Jaspersen Ludigu**

* GitHub: https://github.com/Jaspersen21

---

## ⭐ Why This Project Matters

This project demonstrates:

* Real-world backend architecture
* Authentication and authorization
* Cloud deployment (Render + MongoDB Atlas)
* REST API design and documentation
* Async programming in Python

---

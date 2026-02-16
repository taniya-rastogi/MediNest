# 🏥 MediNest – All-In-One Plateform For Every Healthcare Need
MediNest is a scalable healthcare web application designed to streamline doctor discovery, appointment booking, and healthcare service management.

Built with a production-oriented backend architecture using Node.js, Express.js, and MySQL, MediNest focuses on secure authentication, clean API design, and scalable system structure.

---

## 🚀 Features

### 👨‍⚕️ Doctor Module

* Doctor registration & login
* Secure authentication using JWT (HTTP-only cookies)
* Profile management
* Availability & slot management

### 🧑‍🤝‍🧑 Patient Module

* Patient registration & login
* Browse doctors by specialization
* Paginated doctor listing
* Book appointments
* View appointment history

### 📅 Appointment System

* Slot-based booking
* Validation for duplicate bookings
* Status management (Pending / Confirmed / Cancelled)
* Proper foreign key constraints
* NOT NULL enforced fields for production safety

### 🔐 Authentication & Security

* JWT-based authentication
* HTTP-only cookies (No localStorage token storage)
* Role-based access control (Doctor / Patient)
* Protected routes middleware
* Input validation & sanitization

### 📊 Database Design

* Normalized relational schema
* Proper foreign key relationships
* Production-ready constraints

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication
* RESTful APIs

### Cloud & Storage
* Cloudinary (Image Upload & Optimization)

### Frontend

* HTML
* Tailwind CSS
* JavaScript

### Tools

* Postman (API Testing)
* MySQL Workbench
* Git & GitHub

---

## 🏗️ Project Structure

```
MediNest/
│
├── medinest-backend/
│   ├── database/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   └── healthcareController/
│   │   ├── middleware/
│   │   ├── models/
│   │   │   └── healthcareModel/
│   │   └── routes/
│   │       └── healthcareRoutes/
│   ├── tempUploads/
│   └── package.json
│
└── medinest-frontend/
    ├── auth/
    │   └── healthcare/
    ├── extra/
    ├── images/
    │   ├── healthcare_page_images/
    │   │   ├── advertisement/
    │   │   └── specializations/
    │   ├── index_page_images/
    │   │   └── img/
    │   │       ├── card_images/
    │   │       └── testimonial_images/
    │   └── main_page_images/
    ├── js/
    │   └── healthcare/
    └── public/
        └── healthcare/

```

---

## 🔄 API Architecture

MediNest follows:

* REST principles
* Layered MVC Architecture (Route → Controller → Model → Database)
* Scalable modular folder structure
* JWT-based authentication and role-based access control
* Middleware-driven request handling (e.g., authentication, validation)
* Database normalization and structured schema design (MySQL)
* Optimized API responses and status codes for consistent client handling
* Frontend-backend separation, enabling a full-stack development workflow
---

## 📈 Scalability Considerations

* Pagination implemented for doctor listing
* Middleware-based authentication
* Separation of concerns
* Clean error handling structure

### Future Enhancements

* Payment integration
* Video consultation module
* Notification system
* Microservices architecture

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/medinest.git
cd medinest
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=""
DB_NAME=medinest_healthcare
JWT_SECRET=dkjfmo9hd57i9ki8f1bh2i3476s5egr75r3u8r3uhy4yhy5h56398uh9w934
```

### 4️⃣ Run the server

```bash
npm start
```

---

## 🧠 Learning Outcomes

Through MediNest, the following concepts were practiced:

* Production-level authentication design
* Secure cookie handling
* Database normalization
* Backend modular architecture
* REST API design principles
* Real-world debugging & edge case handling

---

## 🎯 Vision

MediNest aims to evolve into a complete digital healthcare ecosystem integrating:

* Telemedicine
* Pharmacy services
* Lab tests
* Insurance integration
* Emergency services
* Health education & awareness

---

## 📌 Author

Taniya Rastogi
| Backend-focused developer (Node.js | Express | MySQL)

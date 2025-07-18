# BatteryPassportPlatform
 4 independent services



 # 🔋 Digital Battery Passport Backend (Microservices Architecture)

An intelligent backend platform built with Node.js, Express, MongoDB, Kafka, Nodemailer and s3 support to manage digital battery passports. It follows a scalable microservices architecture and supports JWT-based authentication, event-driven communication, file storage, and role-based access control between (user and admin).

---

## 🧱 Microservices Overview

### 1. **Auth Service** (`localhost:5001`)
- Registers and logs in users (admin/user)
- Issues JWTs
- Role-based access control
- No external database exposure

### 2. **Battery Passport Service** (`localhost:5002`)
- CRUD for battery passports
- Authenticated via JWT
- Emits Kafka events: `passport.created`, `passport.updated`, `passport.deleted`

### 3. **Document Service** (`localhost:5003`)
- Upload/download/delete files (S3-compatible) 
- Real time data upload, URL, on s3 storage
- Stores file metadata in MongoDB
- Authenticated via JWT

### 4. **Notification Service** (`localhost:5004`)
- Kafka consumer for passport events
- simulates real-time notifications to email with Nodemailer

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/shiwanshurahul/battery-passport-platform.git
cd battery-passport-platform


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
```

# Kafka Topics & Payloads
##  Emitted Topics by Passport Service

| Topic              | Trigger   | Payload Example             |
| ------------------ | --------- | --------------------------- |
| `passport.created` | On create | Full passport object (JSON) |
| `passport.updated` | On update | Updated passport JSON       |
| `passport.deleted` | On delete | Deleted passport JSON       |

#### passport.created
```json
{
  "key": "62b1f8cdd4a1b2a5a3c4d567",
  "value": {
    "eventId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "timestamp": "2025-07-18T12:00:00Z",
    "actor": { "userId": "user-001", "role": "admin" },
    "passport": {
      "_id": "62b1f8cdd4a1b2a5a3c4d567",
      "data": { /* full passport data */ }
    }
  }
}
```

####  passport.updated
 ```json
  {
  "key": "62b1f8cdd4a1b2a5a3c4d567",
  "value": {
    "eventId": "a23fd456-78a1-4321-9bca-112233445566",
    "timestamp": "2025-07-18T12:05:00Z",
    "actor": { "userId": "user-001", "role": "admin" },
    "passport": {
      "_id": "62b1f8cdd4a1b2a5a3c4d567",
      "data": { /* updated passport data */ }
    }
  }
}
```

#### passport.deleted 
```json
{
  {
  "key": "62b1f8cdd4a1b2a5a3c4d567",
  "value": {
    "eventId": "94bd3e12-34aa-4567-8fae-abcdef123456",
    "timestamp": "2025-07-18T12:10:00Z",
    "actor": { "userId": "user-001", "role": "admin" },
    "passport": { "_id": "62b1f8cdd4a1b2a5a3c4d567" }
  }
}
}
```


# 📡 API usage Guide
 ### 🔐 Auth Service (localhost:5001)
 | Method         | EndPoint           | Description      |
 | -------------- | -------------------| -----------------|
 | 'POST'         | /api/auth/register | Register user    |
 | 'POST'         | /api/auth/login	   | Login & get JWT  |



 ### 📦 Battery Passport Service (localhost:5002)
 | Method         | EndPoint           | Role          |
 | -------------- | -------------------| --------------|
 | 'POST'         | /api/passports     |  Admin        |
 | 'GET'	      |/api/passports/:id  |  Admin/User   |
 | 'PUT'	      | /api/passports/:id |  Admin        |
 | 'DELETE'	      |/api/passports/:id  |  Admin        |

### 📁 Document Service (localhost:5003)
 | Method         | EndPoint                 | Description      |
 | -------------- | -------------------------| -----------------|
 | POST	          |  /api/documents/upload	 | Upload file      |
 |GET	          |  /api/documents/:docId	 | Get download URL |
 |DELETE	      |  /api/documents/:docId	 | Delete file    |

 
#### Use Authorization: Bearer token header in protected routes.
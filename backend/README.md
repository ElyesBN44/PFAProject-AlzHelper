# AlzHelper Backend API

This is the backend API for the AlzHelper mobile application, designed to monitor and support people with Alzheimer’s. It provides endpoints for caregivers and doctors to manage reports, notes, and user authentication.

---

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Caregiver Endpoints](#caregiver-endpoints)
  - [Doctor Endpoints](#doctor-endpoints)
  - [Reports & Notes](#reports--notes)
- [Error Handling](#error-handling)
- [Example Requests](#example-requests)

---

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   - Create a `.env` file in the `backend/` directory with:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=yourSuperSecretKeyHere
     ```
3. **Start the server:**
   ```bash
   node server.js
   # or for development
   npx nodemon server.js
   ```

---

## Environment Variables
- `PORT` - Port for the backend server (default: 5000)
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT authentication

---

## Authentication
- Uses JWT tokens for protected routes.
- Include the token in the `Authorization` header as `Bearer <token>`.

---

## API Endpoints

### Caregiver Endpoints
- **Register:** `POST /api/caregiver/register`
- **Login:** `POST /api/caregiver/login`

### Doctor Endpoints
- **Register:** `POST /api/doctor/register`
- **Login:** `POST /api/doctor/login`

### Reports & Notes
- **Create Report (Caregiver):** `POST /api/report` *(auth required)*
- **Get All Reports (Doctor):** `GET /api/doctor/reports` *(auth required)*
- **Add Note to Report (Doctor):** `POST /api/doctor/note` *(auth required)*
- **Get Notes for Report (Doctor):** `GET /api/doctor/notes/:reportId` *(auth required)*

---

## Error Handling
- Returns JSON error messages with appropriate HTTP status codes.
- Example:
  ```json
  { "message": "Invalid credentials" }
  ```

---

## Example Requests

### Register Caregiver
```http
POST /api/caregiver/register
Content-Type: application/json

{
  "first_name": "Alice",
  "last_name": "Smith",
  "email": "alice@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

### Login Caregiver
```http
POST /api/caregiver/login
Content-Type: application/json

{
  "email": "alice@example.com",
  "password": "password123"
}
```

### Register Doctor
```http
POST /api/doctor/register
Content-Type: application/json

{
  "name": "Dr. Smith",
  "email": "dr.smith@example.com",
  "password": "securePassword",
  "phone": "1234567890"
}
```

### Login Doctor
```http
POST /api/doctor/login
Content-Type: application/json

{
  "email": "dr.smith@example.com",
  "password": "securePassword"
}
```

### Create Report (Caregiver)
```http
POST /api/report
Authorization: Bearer <caregiver_token>
Content-Type: application/json

{
  "symptoms": [
    { "name": "Memory loss", "severity": "moderate" },
    { "name": "Disorientation", "severity": "mild" }
  ]
}
```

### Get All Reports (Doctor)
```http
GET /api/doctor/reports
Authorization: Bearer <doctor_token>
```

### Add Note to Report (Doctor)
```http
POST /api/doctor/note
Authorization: Bearer <doctor_token>
Content-Type: application/json

{
  "reportId": "<report_id>",
  "comment": "Patient is showing improvement."
}
```

### Get Notes for Report (Doctor)
```http
GET /api/doctor/notes/<report_id>
Authorization: Bearer <doctor_token>
```

---

## License
MIT 
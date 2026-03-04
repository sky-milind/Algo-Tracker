# Forex Tracker Backend API

## Database Setup

1. **Import the database schema:**
   ```bash
   mysql -u root -p < database.sql
   ```

2. **Configure environment variables:**
   - Database credentials are in `src/.env`
   - Default credentials:
     - Host: localhost
     - User: root
     - Password: milind@2003
     - Database: Forex-TrackerDB
     - Port: 4002

## Database Tables

### SuperAdmin Table
- **id** (INT, Primary Key, Auto Increment)
- **full_name** (VARCHAR 100)
- **username** (VARCHAR 50, Unique)
- **password** (VARCHAR 255)
- **role** (VARCHAR 20, default: 'superadmin')
- **created_at** (TIMESTAMP)
- **updated_at** (TIMESTAMP)

### Admin Table
- **id** (INT, Primary Key, Auto Increment)
- **full_name** (VARCHAR 100)
- **username** (VARCHAR 50, Unique)
- **password** (VARCHAR 255)
- **role** (VARCHAR 20, default: 'admin')
- **created_by** (INT, Foreign Key to superadmin.id)
- **created_at** (TIMESTAMP)
- **updated_at** (TIMESTAMP)

## Running the Server

```bash
cd Backend
npm install
npm start
```

Server runs on: http://localhost:4002

## API Endpoints

### SuperAdmin Routes

**Base URL:** `/api/superadmin`

#### Login
- **POST** `/api/superadmin/login`
- Body: `{ "username": "string", "password": "string" }`

#### Get All SuperAdmins
- **GET** `/api/superadmin`

#### Get SuperAdmin by ID
- **GET** `/api/superadmin/:id`

#### Create SuperAdmin
- **POST** `/api/superadmin`
- Body: `{ "full_name": "string", "username": "string", "password": "string" }`

#### Update SuperAdmin
- **PUT** `/api/superadmin/:id`
- Body: `{ "full_name": "string", "username": "string", "password": "string" }`

#### Delete SuperAdmin
- **DELETE** `/api/superadmin/:id`

### Admin Routes

**Base URL:** `/api/admin`

#### Login
- **POST** `/api/admin/login`
- Body: `{ "username": "string", "password": "string" }`

#### Get All Admins
- **GET** `/api/admin`

#### Get Admin by ID
- **GET** `/api/admin/:id`

#### Create Admin (by SuperAdmin)
- **POST** `/api/admin`
- Body: `{ "full_name": "string", "username": "string", "password": "string", "created_by": number }`

#### Update Admin
- **PUT** `/api/admin/:id`
- Body: `{ "full_name": "string", "username": "string", "password": "string" }`

#### Delete Admin
- **DELETE** `/api/admin/:id`

#### Get Admins by Creator
- **GET** `/api/admin/creator/:superadminId`

## Default Credentials

### SuperAdmin
- Username: `superadmin`
- Password: `admin123`

### Sample Admins
- Username: `admin1`, Password: `admin123`
- Username: `admin2`, Password: `admin123`

## Frontend API Usage

Import the API service in your React components:

```javascript
import { superAdminAPI, adminAPI } from './services/api';

// Example: Login SuperAdmin
const handleLogin = async () => {
  const result = await superAdminAPI.login('superadmin', 'admin123');
  console.log(result);
};

// Example: Create Admin
const handleCreateAdmin = async () => {
  const result = await adminAPI.create({
    full_name: 'John Doe',
    username: 'johndoe',
    password: 'password123',
    created_by: 1 // SuperAdmin ID
  });
  console.log(result);
};

// Example: Get All Admins
const fetchAdmins = async () => {
  const result = await adminAPI.getAll();
  console.log(result.data);
};
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── database.js          # MySQL connection
│   ├── controllers/
│   │   ├── superAdminController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── SuperAdmin.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── superAdminRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   ├── .env                     # Environment variables
│   └── index.js                 # Main server file
├── database.sql                 # Database schema
├── package.json
└── README.md
```

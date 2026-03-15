# Artificial Jewellery Website 💍

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing and displaying an artificial jewellery catalog.

---

## Tech Stack

| Layer     | Technology                   |
|-----------|------------------------------|
| Frontend  | React 18, React Router v6, Axios |
| Backend   | Node.js, Express.js          |
| Database  | MongoDB (Mongoose ODM)        |
| Auth      | JWT (jsonwebtoken + bcryptjs) |
| Images    | Multer (local disk storage)  |

---

## Features

### User / Visitor
- Browse jewellery catalog
- View full product details
- About & Contact pages

### Admin
- Secure login (JWT)
- Add / Edit / Delete products
- Upload product images (stored locally)
- Dashboard with stats & product table

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Variables

**backend/.env** (already created):
```
PORT=9014
MONGO_URI=mongodb://localhost:27017/artificial-jewellery
JWT_SECRET=shringaar_jwt_secret_key_2024
```

**frontend/.env** (already created):
```
REACT_APP_API_URL=http://localhost:9014/api
REACT_APP_BACKEND_URL=http://localhost:9014
```

### 3. Run

```bash
# Terminal 1 – Backend
cd backend
npm run dev

# Terminal 2 – Frontend
cd frontend
npm start
```

### 4. Seed Admin Account

Visit: `http://localhost:9014/api/admin/seed`  
Or use curl:
```bash
curl -X POST http://localhost:9014/api/admin/seed
```
Default credentials: `admin` / `admin123`

---

## API Endpoints

| Method | Endpoint              | Auth     | Description        |
|--------|-----------------------|----------|--------------------|
| GET    | /api/products         | Public   | Get all products   |
| GET    | /api/products/:id     | Public   | Get product by ID  |
| POST   | /api/products         | Admin    | Create product     |
| PUT    | /api/products/:id     | Admin    | Update product     |
| DELETE | /api/products/:id     | Admin    | Delete product     |
| POST   | /api/admin/login      | Public   | Admin login        |
| POST   | /api/admin/seed       | Public   | Seed default admin |

---

## Folder Structure

```
artificial-jewellery-website/
├── backend/          # Express API
│   ├── config/       # MongoDB connection
│   ├── controllers/  # Route handlers
│   ├── middleware/   # JWT auth
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   └── uploads/      # Uploaded images
└── frontend/         # React app
    └── src/
        ├── admin/    # Admin pages
        ├── components/
        ├── pages/
        └── services/ # Axios API calls
```

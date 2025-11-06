# Netflix Login Page

A fully responsive Netflix-style login page built with modern web technologies. This project includes both frontend and backend integration, mimicking a real-world authentication flow with a sleek UI inspired by Netflix.

---

##  Live Demo

🔗 Frontend: [https://netflix-login-page-theta.vercel.app](https://netflix-login-page-theta.vercel.app)  
🔗 Backend: [https://netflix-backend-fit7.onrender.com](https://netflix-backend-fit7.onrender.com)

---

## Test Login Credentials

To experience the full login flow, use the following mock credentials:

- **Email**: `user@example.com`
- **Password**: `password123`

These credentials are handled by a mock backend and will simulate a successful login. After login, you'll be redirected to a protected dashboard page.
> Note: This is a demo setup. No real authentication or data storage is involved.

---

## Tech Stack

### Frontend
- **Vite** – Fast build tool for modern web apps
- **React JS** – Component-based UI
- **Tailwind CSS** – Utility-first CSS framework
- **React Router DOM** – Client-side routing
- **Lucide Icons** – Icon library for UI elements

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for REST APIs
- **CORS** – Cross-Origin Resource Sharing
- **Mock Authentication** – Simulated login flow with token

### Deployment
- **Frontend** – Vercel
- **Backend** – Render

---

## Project Structure

root/ ├── backend/
│ ├── server.js
│ ├── package.json
│ └── ... ├── frontend/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── .env
│ ├── vite.config.js
│ └── ...
└── README.md

---

## Features

- ✅ Netflix-style UI with logo and background
- ✅ Responsive design for mobile and desktop
- ✅ Input validation with error messages
- ✅ Show/hide password toggle
- ✅ Remember Me checkbox
- ✅ Mock login with token storage
- ✅ Protected dashboard route
- ✅ Sign out functionality
- ✅ CORS-enabled backend API

---

## Authentication Flow

1. User enters email and password
2. Frontend sends POST request to `/api/login`
3. Backend validates credentials (mock user)
4. If valid, returns token and user info
5. Token stored in `localStorage`
6. Dashboard accessible only after login
7. Sign out clears token and redirects to login

---

## How to Run Locally

### 1.Clone the repo

git clone https://github.com/Mohamed-Nivas/Netflix-login-page.git
cd Netflix-login-page

### 2.Install dependencies

- cd backend
- npm install

- cd ../frontend
- npm install

### 3.Set environment variables

Create .env file in frontend/: 
Add inside this code : VITE_API_URL=http://localhost:4000

### 4.Start servers

 **Backend**
- cd backend
- node server.js

**Frontend**
- cd frontend
- npm run dev

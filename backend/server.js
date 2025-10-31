const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Allowed origins (Vercel + Local)
const allowedOrigins = [
  "https://netflix-login-page-blond.vercel.app", // your Vercel frontend
  "http://localhost:5173",
];

// Proper CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("/*", cors());

app.use(express.json());

// Dummy user
const MOCK_USER = {
  email: "user@example.com",
  password: "password123",
  name: "Demo User",
};

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email);

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password required" });
  }

  setTimeout(() => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      return res.json({
        success: true,
        token: "mock-jwt-token",
        user: { name: MOCK_USER.name, email: MOCK_USER.email },
      });
    }

    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }, 1000);
});

// Token verification route
app.get("/api/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === "mock-jwt-token") {
    return res.json({ success: true, message: "Token valid" });
  }
  return res.status(403).json({ success: false, message: "Invalid token" });
});

// Start server
app.listen(PORT, () => console.log(`✅ Auth server running on port ${PORT}`));

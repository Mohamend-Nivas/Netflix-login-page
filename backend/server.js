const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: [
      "http://localhost:5173", //  Local frontend
      "https://netflix-login-page-theta.vercel.app", // Deployed frontend
    ],
    credentials: true,
  })
);
app.use(express.json());

const users = []; // In-memory user store

app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password required" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }

  users.push({ email, password });
  return res.json({ success: true, message: "Signup successful" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  return res.json({
    success: true,
    token: "mock-jwt-token",
    user: { email: user.email },
  });
});

app.get("/api/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === "mock-jwt-token") {
    return res.json({ success: true, message: "Token valid" });
  }
  return res.status(403).json({ success: false, message: "Invalid token" });
});

app.listen(PORT, () =>
  console.log(`Auth server running on http://localhost:${PORT}`)
);

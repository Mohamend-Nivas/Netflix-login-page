const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const MOCK_USER = {
  email: "user@example.com",
  password: "password123",
  name: "Demo User",
};

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

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

app.use(bodyParser.json());

app.use(cors());

const authenticateUser = (req, res, next) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

app.post("/login", authenticateUser, (req, res) => {
  res.json({
    message: "Login successful",
    user: req.user,
    token: "dummyToken",
  });
});

app.get("/user", authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

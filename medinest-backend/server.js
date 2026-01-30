// Terminal commands:
// cd medinest-backend
// node server.js

// Ports info:
// 5500 / 5501 → Frontend (VS Code Live Server)
// 3000 → Backend (Node.js / Express server)

require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// -------------------- CORS Configuration --------------------
app.use(cors({
  origin: [
    'http://127.0.0.1:5500', 
    'http://127.0.0.1:5501' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// -------------------- Middlewares --------------------
app.use(express.json());

// -------------------- Test API Route --------------------
app.get("/", (req, res) => {
  res.json({ message: "MediNest Backend is running" });
});

// -------------------- Route Modules --------------------
//Healthcare
const healthcareRoutes = require('./src/routes/healthcareRoutes/index');
app.use("/api/healthcare", healthcareRoutes);

// -------------------- Global Error Handler --------------------
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});


// -------------------- Server Start --------------------
app.listen(port, () => {
  console.log(`MediNest Backend is running on port ${port}`);
});

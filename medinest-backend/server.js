require("dotenv").config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require("fs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const port = process.env.PORT || 3000;

// -------------------- Rate Limit --------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// -------------------- Middlewares --------------------
app.use(helmet());

app.use(cors({
  origin: [
    process.env.FRONTEND_URL_1,
    process.env.FRONTEND_URL_2
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", limiter);

// -------------------- Test API --------------------
app.get("/", (req, res) => {
  res.json({ message: "MediNest Backend is running" });
});

// -------------------- Routes --------------------
const healthcareRoutes = require('./src/routes/healthcareRoutes/index');
app.use("/api/healthcare", healthcareRoutes);

// -------------------- Error Handler --------------------
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

// -------------------- Upload Folder --------------------
if (!fs.existsSync("tempUploads")) {
  fs.mkdirSync("tempUploads");
}

// -------------------- Server Start --------------------
app.listen(port, () => {
  console.log(`MediNest Backend is running on port ${port}`);
});
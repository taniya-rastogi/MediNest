// authDoctor.js (Token verification middleware)
// src/middleware/authDoctor.js


const jwt = require("jsonwebtoken");

const authDoctor = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.doctor = decoded; // doctor id stored here
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authDoctor;

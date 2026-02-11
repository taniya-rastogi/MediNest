// authDoctor.js (Token verification middleware)
// src/middleware/authDoctor.js

const jwt = require("jsonwebtoken");

const authDoctor = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userType !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.doctor = {
      doctorId: decoded.doctorId,
      userType: decoded.userType
    };

    next();

  }catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authDoctor;

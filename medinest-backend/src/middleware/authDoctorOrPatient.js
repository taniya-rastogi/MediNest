// src/middleware/authDoctorOrPatient.js
// returns "userType"

const jwt = require("jsonwebtoken");

const authDoctorOrPatient = (req, res, next) => {
  const token = req.cookies.token; // HttpOnly cookie

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded should have doctorId or patientId + userType
    if (!decoded.userType || !decoded.userType.match(/doctor|patient/)) {
      return res.status(403).json({ message: "Invalid user type" });
    }

    // Attach user info to request
    req.user = {
      id: decoded.doctorId || decoded.patientId, // support whichever used in token
      userType: decoded.userType
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authDoctorOrPatient;

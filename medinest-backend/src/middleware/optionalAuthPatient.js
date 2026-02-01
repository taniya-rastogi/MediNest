//src/middleware/optionalAuthPatient.js

const jwt = require("jsonwebtoken");

const optionalAuthPatient = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Only attach if patient
      if (decoded.userType === "patient") {
        req.patient = { 
          id: decoded.patientId, 
          userType: decoded.userType 
        };
      } else {
        req.patient = null; // token exists but not patient
      }

    } catch (err) {
      req.patient = null; // invalid token
    }
  } else {
    req.patient = null;   // public user
  }

  next();
};

module.exports = optionalAuthPatient;

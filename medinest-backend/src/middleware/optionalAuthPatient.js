//src/middleware/optionalAuthPatient.js

const jwt = require("jsonwebtoken");

const optionalAuthPatient = (req, res, next) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.userType === "patient") {
        req.patient = { 
          id: decoded.patientId, 
          userType: decoded.userType 
        };
      } else {
        req.patient = null;
      }
    } catch (err) {
      req.patient = null;
    }
  } else {
    req.patient = null;
  }

  next();
};

module.exports = optionalAuthPatient;

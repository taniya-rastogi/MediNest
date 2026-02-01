//src/middleware/authPatient.js
//will be used for patient dashboard or somthing which need patient login

const jwt = require("jsonwebtoken");

const authPatient = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userType !== "patient") {
      return res.status(403).json({ message: "Access denied" });
    }

    // normalize patient object
    req.patient = { id: decoded.patientId, userType: decoded.userType };
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authPatient;

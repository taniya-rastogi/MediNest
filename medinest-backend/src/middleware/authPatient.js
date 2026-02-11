//src/middleware/authPatient.js
//will be used for patient dashboard or somthing which need patient login

const jwt = require("jsonwebtoken");

const authPatient = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "patient is not registered/logged in" }); //patient is not logged in
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userType !== "patient") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.patient = { 
      id: decoded.patientId, 
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

module.exports = authPatient;

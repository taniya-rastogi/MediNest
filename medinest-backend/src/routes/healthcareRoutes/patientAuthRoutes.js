// patientAuthRoutes.js


const router = require("express").Router();

const patientAuthController = require("../../controllers/healthcareController/patientAuthController");


// Login patient
// http://localhost:3000/api/healthcare/patient/auth/login
router.post("/login", patientAuthController.patientLogin);
//Example: body data
// {
//   "identifier": "ravi.sharma@example.com",
//   "password": "password@123"
// }


module.exports = router;

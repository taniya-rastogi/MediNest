// bookAppointmentRoutes.js

const express = require("express");
const router = express.Router();
const authPatient = require("../../middleware/authPatient");
const bookAppointmentController = require("../../controllers/healthcareController/bookAppointmentController");

// Book appointment form
// Example: GET /api/healthcare/book-appointment/Psychology/11
// GET /api/healthcare/book-appointment/form/:specialization/:doctor_id (will get patient_id from token)
router.get("/form/:specialization/:doctorId", authPatient, bookAppointmentController.appointmentForm);




module.exports = router;





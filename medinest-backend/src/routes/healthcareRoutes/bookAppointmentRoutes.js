// bookAppointmentRoutes.js

const express = require("express");
const router = express.Router();

const authPatient = require("../../middleware/authPatient");
const optionalAuthPatient = require("../../middleware/optionalAuthPatient");
const upload = require("../../middleware/upload");

const bookAppointmentFormController = require("../../controllers/healthcareController/bookAppointmentFormController");
const bookAppointmentCreateController = require("../../controllers/healthcareController/bookAppointmentCreateController");


// Book appointment form
// Example: GET /api/healthcare/book-appointment/Psychology/11
// GET /api/healthcare/book-appointment/form/:specialization/:doctor_id (will get patient_id from token if needed)
router.get("/form/:specialization/:doctorId", optionalAuthPatient, bookAppointmentFormController.appointmentForm);


// Book appointment create
// Example: POST /api/healthcare/book-appointment/Psychology/11
// POST /api/healthcare/book-appointment/create/:specialization/:doctor_id (will get patient_id from token)
router.post("/create/:specialization/:doctorId", authPatient, upload.single("image_url"), bookAppointmentCreateController.appointmentCreate);

module.exports = router;





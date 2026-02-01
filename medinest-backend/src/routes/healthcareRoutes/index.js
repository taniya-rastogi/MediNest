// index.js — Master Router for Healthcare

const express = require('express');
const router = express.Router();

// Specializations
router.use("/specializations", require("./specializationsRoutes"));

// All doctors
// router.use("/doctor", require("./doctorsController")); // future work

// Doctor public routes
router.use("/doctor/specialization", require("./doctorPublicRoutes"));

// Doctor auth Register/login
router.use("/doctor/auth", require("./doctorAuthRoutes"));

// Doctor protected routes (doctor dashboard)
router.use("/doctor", require("./doctorProtectedRoutes"));

// Book appointment
router.use("/book-appointment", require("./bookAppointmentRoutes"));

// get appointments
router.use("/appointment", require("./appointmentsRoutes"));

// Patient auth/login
router.use("/patient/auth", require("./patientAuthRoutes"));



module.exports = router;

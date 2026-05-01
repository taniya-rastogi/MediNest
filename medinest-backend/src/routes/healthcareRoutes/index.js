// index.js — Master Router for Healthcare
// http://127.0.0.1:3000/api/healthcare
const express = require('express');
const router = express.Router();
const specializationsRoutes = require("./specializationsRoutes");
const doctorPublicRoutes = require("./doctorPublicRoutes");
const doctorAuthRoutes = require("./doctorAuthRoutes");
const doctorProtectedRoutes = require("./doctorProtectedRoutes");
const bookAppointmentRoutes= require("./bookAppointmentRoutes");
const appointmentsRoutes = require("./appointmentsRoutes");
const patientAuthRoutes = require("./patientAuthRoutes");
const getUserProfileRoutes = require("./getUserProfileRoutes");



// Specializations
router.use("/specializations", specializationsRoutes);

// // Doctor public routes
// router.use("/doctor-public", require("./doctorPublicRoutes"));

// Doctor public routes
router.use("/doctor/specialization", doctorPublicRoutes);

// Doctor auth Register/login
router.use("/doctor/auth", doctorAuthRoutes);

// Doctor protected routes (doctor dashboard)
router.use("/doctor", doctorProtectedRoutes);

// Book appointment
router.use("/book-appointment", bookAppointmentRoutes);

// get appointments on doctor's dashboard
router.use("/appointment", appointmentsRoutes);

// Patient auth/login
router.use("/patient/auth", patientAuthRoutes);

// Logout 
router.post("/logout", require("../../controllers/healthcareController/logoutController").logoutUser);

router.use("/profile", getUserProfileRoutes);

module.exports = router;

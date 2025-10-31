//src/routes/healthcare.js

const express = require('express');
const router = express.Router();

// Import controllers
const specializationsController = require('../controllers/healthcareController/specializationsController');
const doctorsController = require('../controllers/healthcareController/doctorsController');


// ----------- HEALTHCARE ROUTES -----------

// GET /healthcare
router.get('/', specializationsController.getSpecializations); //(path, callback)
router.get('/:specialization', doctorsController.getDoctorsBySpecialization);
router.get('/:specialization/:doctor_id', doctorsController.getADoctorByIdAndSpecialization);

// POST /healthcare
router.post('/registerDoctor', doctorsController.registerDoctor);
router.post('/bookAppointment', doctorsController.bookAppointment); //book appointment








module.exports = router;

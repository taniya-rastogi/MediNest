//src/routes/healthcare.js

const express = require('express');
const router = express.Router();

// Import controllers
const specializationsController = require('../controllers/healthcareController/specializationsController');
const doctorsController = require('../controllers/healthcareController/doctorsController');

// Multer + Upload function
const upload = require('../middleware/upload'); // Multer
const { uploadDoctorDP } = require('../controllers/healthcareController/doctorsController'); // Upload controller



// ----------- HEALTHCARE ROUTES -----------

// GET /healthcare
router.get('/', specializationsController.getSpecializations); //(path, callback)
router.get('/:specialization', doctorsController.getDoctorsBySpecialization);
router.get('/:specialization/:doctor_id', doctorsController.getADoctorByIdAndSpecialization);

// POST /healthcare
// router.post('/registerDoctor', doctorsController.registerDoctor);(no longer needed)
// router.post('/bookAppointment', appointmentsController.bookAppointment); //book appointment (Important)

// Upload Doctor DP (Profile Image)
// router.post('/uploadDoctorDP', upload.single("profileImage"), uploadDoctorDP);(Important)

// POST /healthcare
router.post('/registerDoctor', upload.single("profile_img"), doctorsController.registerDoctor);




module.exports = router;

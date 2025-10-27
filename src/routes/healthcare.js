const express = require('express');
const router = express.Router();

const getAllHealthcareSpecializations = require('../controllers/healthcareController/getAllHealthcareSpecializations');

// GET /healthcare → list of specializations
router.get('/', getAllHealthcareSpecializations);

// Future dynamic route for specialization-specific data
// router.get('/:specialization', getDoctorsBySpecialization);

module.exports = router;

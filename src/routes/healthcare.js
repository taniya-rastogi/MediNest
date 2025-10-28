//src/routes/healthcare.js

const express = require('express');
const router = express.Router();

// Import controllers
const specializationsController = require('../controllers/healthcareController/specializationsController');
// const doctorsController = require('../controllers/healthcareController/doctorsController');


// ----------- SPECIALIZATION ROUTES -----------

// GET /healthcare → list of specializations
router.get('/', specializationsController);



// ----------- DOCTOR ROUTES -----------





module.exports = router;

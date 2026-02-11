// doctorPublicRoutes.js (public doctor list)

//(Done)

const router = require("express").Router();
const doctorsController = require("../../controllers/healthcareController/doctorsController");

// GET List doctors by specialization
// http://127.0.0.1:3000/api/healthcare/doctor/specialization/:specialization
router.get("/:specialization", doctorsController.getDoctorsBySpecialization);

// GET specific doctor
// http://127.0.0.1:3000/api/healthcare/doctor/specialization/:specialization/:doctor_id
router.get("/:specialization/:doctor_id", doctorsController.getADoctorByIdAndSpecialization);

module.exports = router;

//../healthcareRoutes/getUserProfileRoutes.js

const router = require("express").Router();
const getUserProfileController = require("../../controllers/healthcareController/getUserProfileController");
const authDoctorOrPatient = require("../../middleware/authDoctorOrPatient")

router.get("/", authDoctorOrPatient, getUserProfileController);

module.exports = router;
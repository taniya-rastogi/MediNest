// src/controllers/healthcareController/bookAppointmentController.js

const bookAppointmentModel = require("../../models/healthcareModel/bookAppointmentModel");

const appointmentForm = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;   // public
    const patientId = req.patient.id;      // secure from token

    const [patient_details, consultation_types] = await Promise.all([
      bookAppointmentModel.getPatientDetailsById(patientId),
      bookAppointmentModel.getConsultationTypesByDoctorId(doctorId)
    ]);

    return res.status(200).json({
      success: true,
      data: {
        patient_details,
        consultation_types
      }
    });

  } catch (err) {
    return res.status(500).json({ success:false, message: err.message });
  }
};

module.exports = { appointmentForm };
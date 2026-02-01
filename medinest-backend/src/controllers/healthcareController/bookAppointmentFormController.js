// src/controllers/healthcareController/bookAppointmentFormController.js

const bookAppointmentModel = require("../../models/healthcareModel/bookAppointmentModel");

const appointmentForm = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;   // public param
    const patient = req.patient || null;    // null if public user

    // Always fetch consultation types (public data)
    const consultation_types = await bookAppointmentModel.getConsultationTypesByDoctorId(doctorId);

    let patient_details = null;

    // Only fetch patient data if logged in
    if (patient) {
      patient_details = await bookAppointmentModel.getPatientDetailsById(patient.id);
    }

    return res.status(200).json({
      success: true,
      data: {
        isAuthenticated: !!patient,   // frontend helper flag
        patient_details,              // null for public
        consultation_types
      }
    });

  } catch (err) {
    console.error("appointmentForm error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { appointmentForm };

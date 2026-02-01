const bookAppointmentCreateModel = require("../../models/healthcareModel/bookAppointmentCreateModel");
const bookAppointmentModel = require("../../models/healthcareModel/bookAppointmentModel");
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");

const appointmentCreate = async (req, res) => {
  try {
    const { specialization, doctorId } = req.params;
    const patientToken = req.patient; // { id, userType }

    const { description, appointment_date, slot_id } = req.body;

    // ---------------- VALIDATION ----------------
    if (!patientToken?.id || !appointment_date || !slot_id) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // fetch specialization from doctor
    const specRow = await bookAppointmentModel.getSpecializationIdByDoctorId(doctorId);

    if (!specRow) {
      return res.status(404).json({
        success: false,
        message: "Doctor specialization not found"
      });
    }

    const specialization_id = specRow.specialization_id;


    // ---------------- FETCH PATIENT USING EXISTING MODEL ----------------

    const patientId = patientToken.id;

    const patient = await bookAppointmentModel.getPatientDetailsById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    // ---------------- IMAGE UPLOAD ----------------
    let image_url = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "appointments/prescriptions"
      });

      image_url = result.secure_url;
      fs.unlinkSync(req.file.path); // cleanup temp file
    }

    // ---------------- DATA BUILD ----------------
    const appointmentData = {
      doctor_id: doctorId,
      specialization_id, // map to ID if needed
      patient_id: patientId,

      // snapshot fields
      patient_id: patientId,//------------
      patient_name: patient.patient_name,
      patient_email: patient.email,
      patient_phone: patient.phone,
      age: patient.age,
      gender: patient.gender,

      appointment_date,
      description,
      slot_id,
      image_url,
      status: "pending"
    };

    // ---------------- DB INSERT ----------------
    const appointmentId = await bookAppointmentCreateModel.createAppointment(appointmentData);

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment_id: appointmentId
    });

  } catch (error) {
    console.error("appointmentCreate error:", error);

    // Slot already booked
    if (error.code === "ER_DUP_ENTRY") { //ER_DUP_ENTRY is a MySQL error code.
      return res.status(409).json({
        success: false,
        message: "This slot is already booked. Please select another time slot."
      });
    }

    // Unknown server error
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = { appointmentCreate };

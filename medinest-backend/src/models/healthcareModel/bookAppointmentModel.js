// src/models/healthcareModel/bookAppointmentModel.js

const pool = require('../../config/db_connection');


//Patient Details 
const getPatientDetailsById = async (patientId) => {
  const [rows] = await pool.query(
    `SELECT 
        patient_name,
        phone,
        age,
        gender,
        email
     FROM patients
     WHERE id = ?`,
    [patientId]
  );

  return rows[0]; // single patient
};

//Consultation Types (from doctor table enum)
const getConsultationTypesByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `SELECT consultation_type 
     FROM doctors 
     WHERE id = ?`,
    [doctorId]
  );

  return rows[0]; // Online | Clinic | Both
};


module.exports = {
  getPatientDetailsById,
  getConsultationTypesByDoctorId
};

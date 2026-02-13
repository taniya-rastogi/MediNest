const pool = require("../../config/db_connection");

const findDoctorById = async (doctorId) => {
  const [rows] = await pool.query(
    `SELECT 
        id,
        full_name,
        email,
        phone,
        gender,
        specialization_id,
        qualification,
        experience_years,
        clinic_hospital_name,
        location,
        consultation_type,
        consultation_fee,
        bio,
        dp_url
     FROM doctors 
     WHERE id = ?`,
    [doctorId]
  );

  return rows[0];
};

module.exports = { findDoctorById };

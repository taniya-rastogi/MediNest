// src/models/healthcareModel/specializationModel.js

const pool = require('../../config/db_connection');

//  SELECT d.id, d.name, d.experience, d.phone, d.location, d.rating, s.name AS specialization

// Get doctors by specialization
async function getDoctorsBySpecialization(specialization) {
  const sql = `
    SELECT d.*, s.specializationName AS specialization
    FROM doctors d
    JOIN specializations s ON d.specialization_id = s.id
    WHERE s.specializationName = ?
  `;
  const [rows] = await pool.query(sql, [specialization]);
  return rows;
}

// Get a doctor by specialization + doctor_id
async function getADoctorByIdAndSpecialization(specialization, doctor_id) {
  const sql = `
    SELECT d.*, s.specializationName AS specialization
    FROM doctors d
    JOIN specializations s ON d.specialization_id = s.id
    WHERE s.specializationName = ? AND d.id = ?
  `;
  const [rows] = await pool.query(sql, [specialization, doctor_id]);
  return rows;
}

// Register a doctor
async function registerDoctor(data) {

  // Get specialization ID from specialization Name
  const getSpecSql  = `SELECT id FROM specializations WHERE specializationName = ?`;
  const [specRows] = await pool.query(getSpecSql , [data.specialization]);

  if (specRows.length === 0) {
    throw new Error("Invalid specialization name, not found in table");
  }

  const specialization_id = specRows[0].id;

  const sql = `
    INSERT INTO doctors 
    (full_name, specialization_id, qualification, experience_years, clinic_hospital_name, location, consultation_fee, phone, email, dp_url, bio, gender, consultation_type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    data.full_name,
    specialization_id,
    data.qualification,
    data.experience_years,
    data.clinic_hospital_name,
    data.location,
    data.consultation_fee,
    data.phone,
    data.email,
    data.dp_url,
    data.bio,
    data.gender,
    data.consultation_type
  ];

  const [result] = await pool.query(sql, params);
  return result;
}







module.exports = { getDoctorsBySpecialization, getADoctorByIdAndSpecialization, registerDoctor };








const pool = require("../../config/db_connection");

const createAppointment = async (data) => {
  const sql = `
    INSERT INTO appointments
    (
      doctor_id,
      specialization_id,
      patient_id,
      patient_name,
      patient_email,
      patient_phone,
      age,
      gender,
      appointment_date,
      description,
      slot_id,
      status,
      image_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.doctor_id,
    data.specialization_id,
    data.patient_id,
    data.patient_name,
    data.patient_email,
    data.patient_phone,
    data.age,
    data.gender,
    data.appointment_date,
    data.description,
    data.slot_id,
    data.status,
    data.image_url
  ];

  const [result] = await pool.query(sql, values);
  return result.insertId;
};

module.exports = { createAppointment };

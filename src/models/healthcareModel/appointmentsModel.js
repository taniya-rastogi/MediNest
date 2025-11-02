// // src/models/healthcareModel/appointmentsModel.js

// const pool = require('../../config/db_connection');



// // book Appointment
// async function bookAppointment(data) {

//   // Get specialization ID from specialization Name
//   const getSpecSql  = `SELECT id FROM specializations WHERE specializationName = ?`;
//   const [specRows] = await pool.query(getSpecSql , [data.specialization]);

//   if (specRows.length === 0) {
//     throw new Error("Invalid specialization name, not found in table");
//   }

//   const specialization_id = specRows[0].id;

//   const sql = `
//     INSERT INTO doctors 
//     (full_name, specialization_id, qualification, experience_years, clinic_hospital_name, location, consultation_fee, phone, email, dp_url, bio, gender, consultation_type)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const params = [
//     data.full_name,
//     specialization_id,
//     data.qualification,
//     data.experience_years,
//     data.clinic_hospital_name,
//     data.location,
//     data.consultation_fee,
//     data.phone,
//     data.email,
//     data.dp_url,
//     data.bio,
//     data.gender,
//     data.consultation_type
//   ];

//   const [result] = await pool.query(sql, params);
//   return result;
// }









// module.exports = { bookAppointment };
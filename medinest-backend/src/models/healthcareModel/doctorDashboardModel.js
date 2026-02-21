const pool = require("../../config/db_connection");

//----------doctor profile----------------
const findDoctorById = async (doctorId) => {
  const [rows] = await pool.query(
    `SELECT 
        d.id,
        d.full_name,
        d.email,
        d.phone,
        d.gender,
        s.specialization_name AS specialization,
        d.qualification,
        d.experience_years,
        d.clinic_hospital_name,
        d.location,
        d.consultation_type,
        d.consultation_fee,
        d.bio,
        d.dp_url
     FROM doctors d
     LEFT JOIN specializations s 
        ON d.specialization_id = s.id
     WHERE d.id = ?`,
    [doctorId]
  );

  return rows[0];
};

//---------Today Appointments-------------
const getTodayAppointmentsCount = async (doctorId) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS total
     FROM appointments
     WHERE doctor_id = ?
       AND appointment_date >= CURDATE()
AND appointment_date < CURDATE() + INTERVAL 1 DAY
       AND status = 'confirmed'`,
    [doctorId]
  );

  return rows[0].total;
};

//--------Total Patients (Distinct)---------
const getTotalPatients = async (doctorId) => {
  const [rows] = await pool.query(
    `SELECT COUNT(DISTINCT patient_id) AS total
     FROM appointments
     WHERE doctor_id = ?`,
    [doctorId]
  );

  return rows[0].total;
};

//---------Monthly Earnings-----------------
const getMonthlyEarnings = async (doctorId) => {
  const [rows] = await pool.query(
    `SELECT 
        IFNULL(SUM(fee_at_booking), 0) AS total
     FROM appointments
     WHERE doctor_id = ?
       AND status = 'completed'
       AND MONTH(appointment_date) = MONTH(CURDATE())
       AND YEAR(appointment_date) = YEAR(CURDATE())`,
    [doctorId]
  );

  return rows[0].total;
};

//---------Today's Appointments List---------
const getTodayAppointmentsList = async (doctorId) => {
  const [rows] = await pool.query(
    `SELECT 
        a.id,
        a.patient_name,
        a.description,
        a.status,
        da.start_time,
        da.end_time
     FROM appointments a
     JOIN doctor_availability da 
        ON a.slot_id = da.id
     WHERE a.doctor_id = ?
       AND DATE(a.appointment_date) = CURDATE()
     ORDER BY da.start_time ASC`,
    [doctorId]
  );

  return rows;
};

module.exports = { 
  findDoctorById,
  getTodayAppointmentsCount,
  getTotalPatients,
  getMonthlyEarnings,
  getTodayAppointmentsList
 };

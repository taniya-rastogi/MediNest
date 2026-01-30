const pool = require("../../config/db_connection");

const getDoctorByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM doctors WHERE email = ?",
    [email]
  );
  return rows[0]; // undefined if not found
};

module.exports = {
  getDoctorByEmail
};

// src/models/healthcareModel/patientAuthModel.js

const pool = require("../../config/db_connection");

const getPatientByIdentifier = async (identifier) => {
  const [rows] = await pool.query(
    `SELECT * FROM patients 
     WHERE email = ? OR phone = ? 
     LIMIT 1`,
    [identifier, identifier]
  );

  return rows[0]; // undefined if not found
};

module.exports = {
  getPatientByIdentifier
};

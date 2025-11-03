// doctorDashboardController.js (Protected route response)
// src/controller/healthcareController/doctorDashboardController.js

const pool = require("../../config/db_connection");

const getDashboard = async (req, res) => {
  try {
    const doctorId = req.doctor.id;

    const [rows] = await pool.query(
      "SELECT id, name, email, specialization FROM doctors WHERE id = ?",
      [doctorId]
    );

    return res.json({
      message: "Doctor dashboard",
      doctor: rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboard };


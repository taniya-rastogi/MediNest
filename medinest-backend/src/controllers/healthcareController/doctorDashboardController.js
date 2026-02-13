const doctorDashboardModel = require("../../models/healthcareModel/doctorDashboardModel");

const getDashboard = async (req, res) => {
  try {
    const doctorId = req.doctor.doctorId;

    const doctor = await doctorDashboardModel.findDoctorById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    return res.json({
      message: "Doctor dashboard 1",
      data: doctor
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error dashboard" });
  }
};

module.exports = { getDashboard };

const doctorDashboardModel = require("../../models/healthcareModel/doctorDashboardModel");

const getDashboard = async (req, res) => {
  try {
    const doctorId = req.doctor.doctorId;

    const [
      doctor,
      todayAppointments,
      totalPatients,
      monthlyEarnings,
      getTodayAppointmentsList
    ] = await Promise.all([
      doctorDashboardModel.findDoctorById(doctorId),
      doctorDashboardModel.getTodayAppointmentsCount(doctorId),
      doctorDashboardModel.getTotalPatients(doctorId),
      doctorDashboardModel.getMonthlyEarnings(doctorId),
      doctorDashboardModel.getTodayAppointmentsList(doctorId)

    ]);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    return res.json({
      message: "Doctor dashboard 1",
      success: true,
      data: doctor,
      stats: {
        todayAppointments,
        totalPatients,
        monthlyEarnings
      },
      appointments: getTodayAppointmentsList
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error dashboard" });
  }
};

module.exports = { getDashboard };

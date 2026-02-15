// src/controllers/healthcareController/getUserProfileController.js

const getUserProfileController = (req, res) => {
  try {
    const { userType } = req.user;

    let dashboardUrl;

    if (userType === "doctor") {
      dashboardUrl = "http://127.0.0.1:3000/api/healthcare/doctor/dashboard";
    } else if (userType === "patient") {
      dashboardUrl = "/api/healthcare/patient/dashboard"; // (need to build) your existing patient API
    } else {
      return res.status(400).json({ message: "Unknown user type" });
    }

    res.json({
      success: true,
      role: userType,
      dashboard: dashboardUrl
    });

  } catch (err) {
    console.error("getUserProfileController error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getUserProfileController;

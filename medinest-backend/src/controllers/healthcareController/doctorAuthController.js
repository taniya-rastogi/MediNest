// src/controller/healthcareController/doctorAuthController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorAuthModel = require("../../models/healthcareModel/doctorAuthModel");

const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await doctorAuthModel.getDoctorByEmail(email);

    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { 
        doctorId: doctor.id, 
        userType: "doctor"   // 🔥 match middleware
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error doctorAuthController" });
  }
};

module.exports = { doctorLogin };

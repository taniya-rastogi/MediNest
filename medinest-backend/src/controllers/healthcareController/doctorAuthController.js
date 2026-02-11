// src/controller/healthcareController/doctorAuthController.js
// cookie correction pendding

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
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { 
        doctorId: doctor.id, 
        userType: "doctor"   // match middleware
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const maxAge = 1 * 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge,
      path: "/"
    });

    res.json({
      success: true,
      message: "Doctor Login successful",
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email
      }
    });

  } catch (error) {
    console.error("doctor Login error:", error);
    res.status(500).json({ message: "Server error doctorAuthController" });
  }
};

module.exports = { doctorLogin };

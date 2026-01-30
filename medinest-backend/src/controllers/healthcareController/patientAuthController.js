// src/controller/healthcareController/patientAuthController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const patientAuthModel = require("../../models/healthcareModel/patientAuthModel");

const patientLogin = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Identifier and password required" });
  }

  try {
    // unified lookup (email OR phone)
    const patient = await patientAuthModel.getPatientByIdentifier(identifier);

    if (!patient) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { 
        patientId: patient.id, 
        userType: "patient"   // must match middleware
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      patient: {
        id: patient.id,
        name: patient.patient_name,
        email: patient.email,
        phone: patient.phone
      }
    });

  } catch (error) {
    console.error("patientLogin error:", error);
    res.status(500).json({ message: "Server error patientAuthController" });
  }
};

module.exports = { patientLogin };

// src/controllers/healthcareController/doctorsController.js

const doctorModel = require('../../models/healthcareModel/doctorModel');
const bucket = require("../../firebase");
const fs = require("fs");

// -------- GET Routes --------

// GET /healthcare/:specialization
const getDoctorsBySpecialization = async (req, res) => {
  const specialization = req.params.specialization;

  try {
    const doctors = await doctorModel.getDoctorsBySpecialization(specialization);

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for this specialization' });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors by specialization:', error);
    res.status(500).json({ message: 'Database error' });
  }
};

// GET /healthcare/:specialization/:doctor_id
const getADoctorByIdAndSpecialization = async (req, res) => {
  const specialization = req.params.specialization;
  const doctor_id = req.params.doctor_id;

  try {
    const doctor = await doctorModel.getADoctorByIdAndSpecialization(specialization, doctor_id);

    if (doctor.length === 0) {
      return res.status(404).json({ message: 'No doctor found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Database error' });
  }
};


// -------- POST: Register Doctor --------

const registerDoctor = async (req, res) => {
  try {
    const {
      full_name,
      specialization,
      qualification,
      experience_years,
      clinic_hospital_name,
      location,
      consultation_fee,
      phone,
      email,
      bio,
      gender,
      consultation_type
    } = req.body;

    const file = req.file;
    let dp_url = null;

    if (!full_name || !specialization || !email) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    // ✅ Upload file to Firebase Storage if file exists
    if (file) {
      const fileName = `doctors/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      await new Promise((resolve, reject) => {
        fs.createReadStream(file.path)
          .pipe(fileUpload.createWriteStream({
            metadata: { contentType: file.mimetype },
          }))
          .on("finish", resolve)
          .on("error", reject);
      });

      // ✅ File URL
      dp_url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      // ✅ Remove temp file
      fs.unlink(file.path, () => {});
    }

    // ✅ Insert doctor into DB
    const result = await doctorModel.registerDoctor({
      full_name,
      specialization,
      qualification,
      experience_years,
      clinic_hospital_name,
      location,
      consultation_fee,
      phone,
      email,
      dp_url,
      bio,
      gender,
      consultation_type
    });

    res.status(201).json({
      message: "Doctor registered successfully",
      doctorId: result.insertId,
      profile_url: dp_url
    });

  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getDoctorsBySpecialization,
  getADoctorByIdAndSpecialization,
  registerDoctor
};

// src/controllers/healthcareController/doctorsController.js

const doctorModel = require('../../models/healthcareModel/doctorModel');

// ----------- GET REQUEST -----------

// GET /healthcare/:specialization
const getDoctorsBySpecialization = async (req, res) => {
  const specialization = req.params.specialization;   //(can i make it global variable so that every fn can use it)

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
const getADoctorByIdAndSpecialization = async(req, res) => {
  const specialization = req.params.specialization;  //(can i make it global variable so that every fn can use it)
  const doctor_id = req.params.doctor_id;

  try {
    const doctor = await doctorModel.getADoctorByIdAndSpecialization(specialization, doctor_id);

    if(doctor.length === 0){
      return res.status(404).json({ message: 'No doctor found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Database error' });
  }

}


//POST /healthcare/registerDoctor
const registerDoctor = async (req, res) => {
  const { full_name, specialization, qualification, experience_years, clinic_hospital_name, location, consultation_fee, phone, email, dp_url, bio, gender, consultation_type } = req.body;

  if(!full_name || !specialization || !email){
    return res.status(400).json({ message: "Fill all required fields" });
  }

  try {
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
      doctorId: result.insertId
    });

  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Database error" });
  }
};




module.exports = { getDoctorsBySpecialization, getADoctorByIdAndSpecialization, registerDoctor };

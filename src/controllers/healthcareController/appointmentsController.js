// // src/controllers/healthcareController/appointmentsController.js

// const appointmentsModel = require('../../models/healthcareModel/appointmentsModel');

// //POST /healthcare/bookAppointment
// const bookAppointment = async (req, res) => {
//   const { patient_name, email, phone, gender, age, consultation_type } = req.body;

//   if(!patient_name || (!email && !phone) || !gender || !age || !consultation_type){
//     return res.status(400).json({ message: "Fill all required fields" });
//   }

//   try {
//     const result = await appointmentsModel.bookAppointment({
//       patient_name,
//       email,
//       phone,
//       gender,
//       age,
//       consultation_type
//     });

//     res.status(201).json({
//       message: "Appointment booked successfully",
//       patientId: result.insertId
//     });

//   } catch (error) {
//     console.error("Error booking appointment:", error);
//     res.status(500).json({ message: "Database error" });
//   }
// };


// module.exports = { bookAppointment };
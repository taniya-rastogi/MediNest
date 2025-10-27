//here will be logic or code to retrive the data from Database
//for now we are using dumy data
//queries will run inside the business logic 
// but schema will be written in Models files (i.e. Specialization.js)


// src/controllers/healthcareController/getAllHealthcareSpecializations.js
module.exports = async (req, res) => {
  try {
    // Example: static data (later from DB)
    const specializations = [
      { id: 1, name: 'Skin', route: '/healthcare/skin', icon: '🩹' },
      { id: 2, name: 'Lungs', route: '/healthcare/lungs', icon: '🫁' },
      { id: 3, name: 'Heart', route: '/healthcare/heart', icon: '❤️' },
      { id: 4, name: 'Kidney', route: '/healthcare/kidney', icon: '🧠' }
    ];

    res.status(200).json({
      success: true,
      data: specializations
    });
  } catch (error) {
    console.error('Error fetching specializations:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};




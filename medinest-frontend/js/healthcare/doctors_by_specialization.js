// used in 'doctors.html'
// doctors_by_specialization.js

const params = new URLSearchParams(window.location.search);
const specialization = params.get("specialization");
const doctorsGrid = document.getElementById("doctorsGrid");

if (!specialization) {
  doctorsGrid.innerHTML = `
    <p class="text-white text-center col-span-full">
      No specialization selected
    </p>`;
  throw new Error("No specialization selected");
}

const API_URL = `http://localhost:3000/api/healthcare/doctor/specialization/${encodeURIComponent(specialization)}`;

async function loadDoctors() {
  try {
    const res = await fetch(API_URL);
    const doctors = await res.json();

    if (!Array.isArray(doctors) || doctors.length === 0) {
      doctorsGrid.innerHTML = `
        <p class="text-white text-center col-span-full">
          No doctors available
        </p>`;
      return;
    }

    doctorsGrid.innerHTML = "";

    doctors.forEach(doctor => {
      doctorsGrid.innerHTML += `
        <div class="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition">

          <img src="${doctor.dp_url || '/images/default-doctor.png'}"
               class="w-28 h-28 mx-auto rounded-full object-cover border-4 border-[#0f766e]" />

          <h2 class="text-xl font-semibold mt-4 text-gray-800">
            ${doctor.full_name}
          </h2>

          <p class="text-sm text-[#0f766e] font-medium">
            ${doctor.qualification}
          </p>

          <p class="text-sm text-gray-600 mt-2">
            ${doctor.experience_years}+ Years Experience
          </p>

          <p class="text-sm text-gray-600">
            Fee: ₹${doctor.consultation_fee}
          </p>

          <button
            class="mt-4 w-full bg-gradient-to-r from-[#0f766e] to-[#2dd4bf]
                   text-white py-2 rounded-lg font-semibold hover:opacity-90"
            onclick="goToDoctorProfile(${doctor.id})">
            View Profile
          </button>

        </div>
      `;
    });

  } catch (error) {
    console.error(error);
    doctorsGrid.innerHTML = `
      <p class="text-white text-center col-span-full">
        Failed to load doctors
      </p>`;
  }
}

/* ---------- Navigation Function ---------- */
function goToDoctorProfile(doctorId) {
  window.location.href = 
    `/medinest-frontend/public/healthcare/book_appointment.html?specialization=${encodeURIComponent(specialization)}&doctorId=${doctorId}`;
}

loadDoctors();

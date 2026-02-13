document.addEventListener("DOMContentLoaded", fetchDoctors);

async function fetchDoctors() {
  try {
    const response = await fetch(
      "http://127.0.0.1:3000/api/healthcare/doctor-public/our/all/doctors",
      {
        method: "GET",
        credentials: "include"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

    const doctors = await response.json();
    renderDoctors(doctors);

  } catch (error) {
    console.error("Error:", error);
  }
}

function renderDoctors(doctors) {
  const grid = document.getElementById("doctorsGrid");
  grid.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    grid.innerHTML = `
      <p class="text-white text-center col-span-3">
        No doctors available.
      </p>
    `;
    return;
  }

  doctors.forEach(doctor => {

    const card = `
      <div class="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition">

        <img src="${doctor.dp_url}"
             class="w-28 h-28 mx-auto rounded-full object-cover border-4 border-[#0f766e]" />

        <h2 class="text-xl font-semibold mt-4 text-gray-800">
          Dr. ${doctor.full_name}
        </h2>

        <p class="text-sm text-[#0f766e] font-medium">
          ${doctor.specialization}
        </p>

        <p class="text-sm text-gray-600 mt-2">
          ${doctor.experience_years || 0}+ Years Experience
        </p>

        <p class="text-sm text-gray-600">
          Consultation Fee: ₹${doctor.consultation_fee}
        </p>

        <p class="text-sm text-gray-500 mt-3">
          ${doctor.bio || ""}
        </p>

        <button class="mt-4 w-full bg-gradient-to-r from-[#0f766e] to-[#2dd4bf]
                       text-white py-2 rounded-lg font-semibold hover:opacity-90">
          Book Appointment
        </button>
      </div>
    `;

    grid.insertAdjacentHTML("beforeend", card);
  });
}


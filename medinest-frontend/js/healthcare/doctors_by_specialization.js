// doctors_by_specialization.js
// Used in doctors_by_specialization.html

import API_BASE from "./config.js";

const params = new URLSearchParams(window.location.search);
const specialization = params.get("specialization");

const doctorsGrid = document.getElementById("doctorsGrid");

// ------------------- Validate specialization -------------------
if (!specialization) {
  doctorsGrid.innerHTML = `
    <p class="text-white text-center col-span-full">
      No specialization selected
    </p>`;
  throw new Error("No specialization selected");
}

// ------------------- API URL -------------------
const API_URL = `${API_BASE}/doctor/specialization/${encodeURIComponent(
  specialization
)}`;

// ------------------- Load Doctors -------------------
async function loadDoctors() {
  try {
    const res = await fetch(API_URL, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch doctors");
    }

    const doctors = await res.json();

    if (!Array.isArray(doctors) || doctors.length === 0) {
      doctorsGrid.innerHTML = `
        <p class="text-white text-center col-span-full">
          No doctors available
        </p>`;
      return;
    }

    renderDoctors(doctors);

  } catch (error) {
    console.error("Error loading doctors:", error);

    doctorsGrid.innerHTML = `
      <p class="text-white text-center col-span-full">
        Failed to load doctors
      </p>`;
  }
}

// ------------------- Render Doctors -------------------
function renderDoctors(doctors) {
  doctorsGrid.innerHTML = "";

  doctors.forEach((doctor) => {
    const card = document.createElement("div");

    card.className =
      "bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition";

    card.innerHTML = `
      <img src="${doctor.dp_url || "/images/default-doctor.png"}"
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
        class="view-profile-btn mt-4 w-full bg-gradient-to-r from-[#0f766e] to-[#2dd4bf]
               text-white py-2 rounded-lg font-semibold hover:opacity-90"
        data-id="${doctor.id}">
        View Profile
      </button>
    `;

    doctorsGrid.appendChild(card);
  });

  attachProfileClickHandlers();
}

// ------------------- Attach Event Listeners -------------------
function attachProfileClickHandlers() {
  const buttons = document.querySelectorAll(".view-profile-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const doctorId = btn.dataset.id;
      goToDoctorProfile(doctorId);
    });
  });
}

// ------------------- Navigation -------------------
function goToDoctorProfile(doctorId) {
  window.location.href =
    `/medinest-frontend/public/healthcare/book_appointment.html?specialization=${encodeURIComponent(
      specialization
    )}&doctorId=${doctorId}`;
}

// ------------------- Init -------------------
document.addEventListener("DOMContentLoaded", loadDoctors);
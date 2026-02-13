let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  fetchDoctors(currentPage);
});

async function fetchDoctors(page) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/api/healthcare/doctor/specialization/our/all/doctors?page=${(page)}`
    );

    const result = await response.json();

    renderDoctors(result.data);
    renderPagination(result.totalPages, result.currentPage);

  } catch (error) {
    console.error("Error:", error);
  }
}

function renderDoctors(doctors) {
  const grid = document.getElementById("doctorsGrid");
  grid.innerHTML = "";

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
          ${doctor.experience_years}+ Years Experience
        </p>

        <p class="text-sm text-gray-600">
          Consultation Fee: ₹${doctor.consultation_fee}
        </p>

        <p class="text-sm text-gray-500 mt-3">
          ${doctor.bio || ""}
        </p>
      </div>
    `;

    grid.insertAdjacentHTML("beforeend", card);
  });
}

function renderPagination(totalPages, currentPage) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = `
      <button 
        onclick="changePage(${i})"
        class="px-4 py-2 rounded-lg ${
          i === currentPage
            ? "bg-white text-[#0f766e]"
            : "bg-[#0f766e] text-white"
        }">
        ${i}
      </button>
    `;
    container.insertAdjacentHTML("beforeend", btn);
  }
}

function changePage(page) {
  currentPage = page;
  fetchDoctors(page);
}

const API_URL = "http://127.0.0.1:3000/api/healthcare/specializations";



async function loadSpecializations() {
  try {
    const response = await fetch(API_URL, { credentials: "include" });

    if (!response.ok) {
      throw new Error("Failed to fetch specializations");
    }

    const result = await response.json();

    // Your API returns { success, message, data }
    if (!result.success) {
      throw new Error(result.message);
    }

    renderSpecializations(result.data);

  } catch (error) {
    console.error("Error:", error);
  }
}

function renderSpecializations(specializations) {
  const container = document.getElementById("specializationContainer");
  container.innerHTML = "";

  specializations.forEach(spec => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded shadow p-4 text-center cursor-pointer hover:shadow-lg transition";

    card.innerHTML = `
      <img
        src="${spec.specialization_img_url}"
        alt="${spec.specialization_name}"
        class="mx-auto mb-2 w-16 h-16 object-cover rounded-full"
      />

      <p class="font-bold text-[#0f766e]">
        ${spec.specialization_name}
      </p>

      <p class="text-sm text-[#0f766e] mt-1 line-clamp-2">
        ${spec.description}
      </p>
    `;

    // Add click listener here
    card.addEventListener("click", () => {
      goToDoctors(spec.specialization_name);
    });

    container.appendChild(card);
  });
}

/* ---------- Navigation Function ---------- */
function goToDoctors(specialization) {
    window.location.href =
      `doctors.html?specialization=${encodeURIComponent(specialization)}`;
}

// Load data when page loads
document.addEventListener("DOMContentLoaded", loadSpecializations);

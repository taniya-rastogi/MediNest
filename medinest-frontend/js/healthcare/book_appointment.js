const API_BASE = "http://localhost:3000/api/healthcare";

const params = new URLSearchParams(window.location.search);
const doctorId = params.get("doctorId");
const specialization = params.get("specialization");
const fileInput = document.getElementById("medicalReport");
const chooseFileBtn = document.getElementById("chooseFileBtn");
const selectedFileBox = document.getElementById("selectedFileBox");
const selectedFileName = document.getElementById("selectedFileName");
const removeFileBtn = document.getElementById("removeFileBtn");

// Form elements
const patientName = document.getElementById("patientName");
const patientPhone = document.getElementById("patientPhone");
const patientAge = document.getElementById("patientAge");
const patientGender = document.getElementById("patientGender");
const patientEmail = document.getElementById("patientEmail");
const appointmentDate = document.getElementById("appointmentDate");
const slotsGrid = document.getElementById("slotsGrid");
const slotsContainer = document.getElementById("slotsContainer");
const consultationType = document.getElementById("consultationType");
const problem = document.getElementById("problem");
const bookBtn = document.getElementById("bookBtn");

let selectedSlotId = null;
const API_URL = `http://localhost:3000/api/healthcare/doctor/specialization/${encodeURIComponent(specialization)}/${encodeURIComponent(doctorId)}`;

/* ===================== FETCH DOCTOR ===================== */
async function loadDoctorProfile() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const doctor = data[0];

  if (!doctor) return;

  document.getElementById("doctorName").innerText = doctor.full_name;
  document.getElementById("doctorNameHeader").innerText = doctor.full_name;

  document.getElementById("doctorSpecialization").innerText =
    doctor.specialization;

  document.getElementById("doctorQualification").innerText =
    doctor.qualification;

  document.getElementById("doctorGender").innerText =
    doctor.gender;

  document.getElementById("doctorHospital").innerText =
    doctor.clinic_hospital_name;

  document.getElementById("doctorBio").innerText =
    doctor.bio;

  document.getElementById("doctorImage").src =
    doctor.dp_url;


    document.getElementById("doctorExperience").innerText =
  `${doctor.experience_years}+ Years`;

document.getElementById("doctorLocation").innerText =
  doctor.location;

document.getElementById("doctorFee").innerText =
  `₹${doctor.consultation_fee}`;

document.getElementById("doctorConsultationType").innerText =
  doctor.consultation_type;
}

/* ===================== FORM CONTEXT ===================== */
async function loadFormContext() {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const headers = {};
  if (token && userType === "patient") {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(
    `${API_BASE}/book-appointment/form/${specialization}/${doctorId}`,
    {
      credentials: "include",
      headers
    }
  );
  const { data } = await res.json();

  if (data.isAuthenticated && data.patient_details) {
    const p = data.patient_details;
    patientName.value = p.patient_name || "";
    patientPhone.value = p.phone || "";
    patientAge.value = p.age || "";
    patientGender.value = p.gender || "";
    patientEmail.value = p.email || "";
  }

  consultationType.innerHTML =
    `<option>${data.consultation_types.consultation_type}</option>`;
}

/* ===================== SLOTS ===================== */
let isSlotAvailableForDate = false;

appointmentDate.addEventListener("change", async () => {
  const date = appointmentDate.value;

  slotsGrid.innerHTML = "";
  slotsContainer.classList.remove("hidden");
  selectedSlotId = null;
  isSlotAvailableForDate = false;

  clearError("errorSlot"); // important

  const res = await fetch(
    `${API_BASE}/appointment/doctor/${doctorId}/availability?date=${date}`
  );

  const data = await res.json();

  // No slots at all
  if (!data.available || !data.slots || data.slots.length === 0) {
    slotsGrid.innerHTML = `
      <div class="col-span-3 text-red-600 text-sm font-semibold">
        Slot is not available on this date
      </div>
    `;
    isSlotAvailableForDate = false;
    return;
  }

  // Slots exist
  isSlotAvailableForDate = true;

  data.slots.forEach(slot => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slot-btn";

    btn.innerText =
      `${slot.start_time.slice(0,5)} - ${slot.end_time.slice(0,5)}`;

    btn.onclick = () => {
      document.querySelectorAll(".slot-btn")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
      selectedSlotId = slot.slot_id;
      clearError("errorSlot");
    };

    slotsGrid.appendChild(btn);
  });
});


function showError(id, message) {
  const el = document.getElementById(id);
  el.innerText = message;
  el.classList.remove("hidden");
}

function clearError(id) {
  const el = document.getElementById(id);
  el.innerText = "";
  el.classList.add("hidden");
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function attachClearOnInput(inputEl, errorId) {
  inputEl.addEventListener("input", () => {
    if (inputEl.value.trim()) {
      clearError(errorId);
    }
  });
}

appointmentDate.addEventListener("change", () => {
  if (appointmentDate.value) {
    clearError("errorAppointmentDate");
  }
});

consultationType.addEventListener("change", () => {
  if (consultationType.value) {
    clearError("errorConsultationType");
  }
});



fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    console.log("Selected file:", fileInput.files[0].name);
  }
});

// Open file picker
chooseFileBtn.addEventListener("click", () => {
  fileInput.click();
});

// After file selection
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    selectedFileName.textContent = fileInput.files[0].name;
    chooseFileBtn.classList.add("hidden");
    selectedFileBox.classList.remove("hidden");
  }
});

// Remove selected file
removeFileBtn.addEventListener("click", () => {
  fileInput.value = ""; // IMPORTANT: clears file
  selectedFileBox.classList.add("hidden");
  chooseFileBtn.classList.remove("hidden");
});

bookBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  let isValid = true;

  // Clear all errors
  [
    "errorPatientName",
    "errorPatientPhone",
    "errorPatientAge",
    "errorPatientGender",
    "errorPatientEmail",
    "errorAppointmentDate",
    "errorConsultationType",
    "errorProblem",
    "errorSlot"
  ].forEach(clearError);

  // Name
  if (!patientName.value.trim()) {
    showError("errorPatientName", "*Patient name is required");
    isValid = false;
  }

  // Phone
  if (!patientPhone.value.trim()) {
    showError("errorPatientPhone", "*Mobile number is required");
    isValid = false;
  }

  // Age
  if (!patientAge.value.trim()) {
    showError("errorPatientAge", "*Age is required");
    isValid = false;
  }

  // Gender
  if (!patientGender.value.trim()) {
    showError("errorPatientGender", "*Gender is required");
    isValid = false;
  }

  // Email
  if (!patientEmail.value.trim()) {
    showError("errorPatientEmail", "*Email is required");
    isValid = false;
  } else if (!isValidEmail(patientEmail.value.trim())) {
    showError("errorPatientEmail", "*Enter valid email");
    isValid = false;
  }

  // Date
  if (!appointmentDate.value) {
    showError("errorAppointmentDate", "*Appointment date is required");
    isValid = false;
  }

  // Slot (only if slots exist for that date)
  if (isSlotAvailableForDate && !selectedSlotId) {
    showError("errorSlot", "*Please select a slot");
    isValid = false;
  }

  // Consultation Type
  if (!consultationType.value) {
    showError("errorConsultationType", "*Consultation type is required");
    isValid = false;
  }

  // Problem
  if (!problem.value.trim()) {
    showError("errorProblem", "*Please describe your problem");
    isValid = false;
  }

  // STOP if validation fails
  if (!isValid) return;

  /* ===================== FORM DATA ===================== */

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (!token || userType !== "patient") {
    alert("Please login as a patient to book an appointment.");
    window.location.href = "/medinest-frontend/auth/healthcare/login.html?redirect=" + encodeURIComponent(window.location.href);
    return;
  }

  const formData = new FormData();
  formData.append("description", problem.value.trim());
  formData.append("appointment_date", appointmentDate.value);
  formData.append("slot_id", selectedSlotId);
  if (fileInput.files.length > 0) {
    formData.append("image_url", fileInput.files[0]);
  }

  bookBtn.disabled = true;
  bookBtn.textContent = "Booking...";

  try {
    const url = `${API_BASE}/book-appointment/create/${specialization}/${doctorId}`;
    console.log("[Book Appointment] POST", url);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("[Book Appointment] Invalid JSON response:", text);
      alert("Server returned invalid response. Check console for details.");
      bookBtn.disabled = false;
      bookBtn.textContent = "Pay & Book Appointment";
      return;
    }

    console.log("[Book Appointment] Response", res.status, data);

    if (!res.ok) {
      alert(data.message || "Failed to book appointment");
      bookBtn.disabled = false;
      bookBtn.textContent = "Pay & Book Appointment";
      return;
    }

    alert(data.message || "Appointment booked successfully!");
    window.location.href = "/medinest-frontend/auth/healthcare/patient_dashboard.html";
  } catch (err) {
    console.error("[Book Appointment] Error:", err);
    alert("Something went wrong. Please try again. Check console for details.");
    bookBtn.disabled = false;
    bookBtn.textContent = "Pay & Book Appointment";
  }
});



/* ===================== INIT ===================== */

attachClearOnInput(patientName, "errorPatientName");
attachClearOnInput(patientPhone, "errorPatientPhone");
attachClearOnInput(patientAge, "errorPatientAge");
attachClearOnInput(patientGender, "errorPatientGender");
attachClearOnInput(patientEmail, "errorPatientEmail");
attachClearOnInput(problem, "errorProblem");

loadDoctorProfile();
loadFormContext();



























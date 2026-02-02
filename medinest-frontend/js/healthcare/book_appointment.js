const API_BASE = "http://localhost:3000/api/healthcare";

const params = new URLSearchParams(window.location.search);
const doctorId = params.get("doctorId");
const specialization = params.get("specialization");

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
  const res = await fetch(
    `${API_BASE}/book-appointment/form/${specialization}/${doctorId}`,
    { credentials: "include" }
  );
  const { data } = await res.json();

  if (data.isAuthenticated) {
    const p = data.patient_details;
    patientName.value = p.patient_name;
    patientPhone.value = p.phone;
    patientAge.value = p.age;
    patientGender.value = p.gender;
    patientEmail.value = p.email;
  }

  consultationType.innerHTML =
    `<option>${data.consultation_types.consultation_type}</option>`;
}

/* ===================== SLOTS ===================== */
appointmentDate.addEventListener("change", async () => {
  const date = appointmentDate.value;

  slotsGrid.innerHTML = "";
  slotsContainer.classList.remove("hidden");

  const res = await fetch(
    `${API_BASE}/appointment/doctor/${doctorId}/availability?date=${date}`
  );

  const data = await res.json();

  // No slots available
  if (!data.available || !data.slots || data.slots.length === 0) {
    slotsGrid.innerHTML = `
      <div class="col-span-3 text-red-600 text-sm font-semibold">
        Slot is not available on this date
      </div>
    `;
    selectedSlotId = null;
    return;
  }

  // Render slots
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


bookBtn.addEventListener("click", (e) => {
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

  // Slot
  if (!selectedSlotId) {
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

  if (!isValid) return;

  // If everything is valid
  alert("All validations passed. Proceed to payment");
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



























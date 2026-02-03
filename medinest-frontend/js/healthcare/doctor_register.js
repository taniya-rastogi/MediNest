const API_BASE = "http://localhost:3000/api/healthcare";
const REGISTER_URL = `${API_BASE}/doctor/auth/register`;
const SPECIALIZATIONS_URL = `${API_BASE}/specializations`;

const form = document.getElementById("doctorForm");
const passwordInput = document.getElementById("password");
const specializationSelect = document.getElementById("specialization");
const profileImgInput = document.getElementById("profileImg");
const submitBtn = form?.querySelector('button[type="submit"]');

/* ===================== LOAD SPECIALIZATIONS ===================== */
async function loadSpecializations() {
  if (!specializationSelect) return;
  try {
    const res = await fetch(SPECIALIZATIONS_URL);
    const result = await res.json();
    if (!result.success || !result.data) {
      console.error("Failed to load specializations:", result.message);
      return;
    }
    specializationSelect.innerHTML = '<option value="">Select Specialization</option>';
    result.data.forEach((spec) => {
      const opt = document.createElement("option");
      opt.value = spec.specialization_name;
      opt.textContent = spec.specialization_name;
      specializationSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Error loading specializations:", err);
  }
}

/* ===================== TOGGLE PASSWORD ===================== */
function togglePassword() {
  if (!passwordInput) return;
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

/* ===================== SUCCESS MESSAGE ===================== */
function showSuccessMessage(message) {
  const banner = document.createElement("div");
  banner.className = "fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg bg-green-600 text-white font-semibold text-center";
  banner.textContent = message + " Redirecting to login...";
  document.body.appendChild(banner);
  setTimeout(() => {
    window.location.href = "/medinest-frontend/auth/healthcare/login.html";
  }, 2000);
}

/* ===================== VALIDATION ===================== */
function validateForm() {
  let valid = true;
  form.querySelectorAll("[data-required]").forEach((field) => {
    const wrapper = field.closest(".form-field");
    const genericError = wrapper?.querySelector("p:not([data-error])");
    const emptyError = wrapper?.querySelector('[data-error="empty"]');
    const invalidError = wrapper?.querySelector('[data-error="invalid"]');

    [genericError, emptyError, invalidError].forEach((err) => {
      if (err) err.classList.add("hidden");
    });
    field.classList.remove("border-red-500");

    if (!field.value || !field.value.trim()) {
      if (emptyError) emptyError.classList.remove("hidden");
      else if (genericError) genericError.classList.remove("hidden");
      field.classList.add("border-red-500");
      valid = false;
      return;
    }

    if (field.hasAttribute("data-email")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        if (invalidError) invalidError.classList.remove("hidden");
        field.classList.add("border-red-500");
        valid = false;
      }
    }
  });
  return valid;
}

/* ===================== SUBMIT ===================== */
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append("full_name", document.getElementById("fullName").value.trim());
  formData.append("email", document.getElementById("email").value.trim());
  formData.append("password", passwordInput.value);
  formData.append("phone", document.getElementById("phone").value.trim());
  formData.append("gender", document.getElementById("gender").value);
  formData.append("specialization", specializationSelect.value);
  formData.append("qualification", document.getElementById("qualification").value.trim());
  formData.append("experience_years", document.getElementById("experience").value);
  formData.append("consultation_type", document.getElementById("consultationType").value);
  formData.append("consultation_fee", document.getElementById("consultationFee").value);
  formData.append("clinic_hospital_name", document.getElementById("clinicName").value.trim());
  formData.append("location", document.getElementById("location").value.trim());
  formData.append("bio", document.getElementById("bio").value.trim());

  if (profileImgInput?.files?.length > 0) {
    formData.append("profile_img", profileImgInput.files[0]);
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Registering...";

  try {
    const res = await fetch(REGISTER_URL, {
      method: "POST",
      body: formData
    });

    const text = await res.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      console.error("[Doctor Register] Invalid JSON:", text);
      alert("Server returned invalid response.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Register as Doctor";
      return;
    }

    if (!res.ok) {
      alert(data.message || "Registration failed");
      submitBtn.disabled = false;
      submitBtn.textContent = "Register as Doctor";
      return;
    }

    showSuccessMessage(data.message || "Doctor registered successfully!");
  } catch (err) {
    console.error("[Doctor Register] Error:", err);
    alert("Something went wrong. Please try again.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Register as Doctor";
  }
});

/* ===================== INIT ===================== */
if (typeof togglePassword === "function") {
  window.togglePassword = togglePassword;
}
loadSpecializations();

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.querySelector('input[name="role"]:checked')?.value;

  if (!role) {
    alert("Please select Doctor or Patient");
    return;
  }

  let url = "";
  let bodyData = {};

  // 🔁 Decide API based on role
  if (role === "patient") {
    url = "http://localhost:3000/api/healthcare/patient/auth/login";

    bodyData = {
      identifier: email,   // backend expects identifier
      password
    };
  }

  if (role === "doctor") {
    url = "http://localhost:3000/api/healthcare/doctor/auth/login";

    bodyData = {
      email,
      password
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", data.token);
    localStorage.setItem("userType", role);

    // Optional user info
    if (role === "patient") {
      localStorage.setItem("patient", JSON.stringify(data.patient));
      window.location.href = "/medinest-frontend/auth/healthcare/patient_dashboard.html";
    } else {
      localStorage.setItem("doctor", JSON.stringify(data.doctor));
      window.location.href = "/medinest-frontend/auth/healthcare/doctor_dashboard.html";
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error. Please try again.");
  }
});

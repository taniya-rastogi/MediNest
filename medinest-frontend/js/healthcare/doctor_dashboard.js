//doctor_dashboard.js
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:3000/api/healthcare/doctor/dashboard",
      {
        method: "GET",
        credentials: "include", //IMPORTANT for httpOnly cookie
      },
    );

    if (!response.ok) {
      throw new Error("Not authorized");
    }

    const result = await response.json();
    // const result = await response.json();
    console.log("Dashboard API result:", result);

    if (!result.success) {
      throw new Error(result.message);
    }

    const doctor = result.data;

    //---------------- Populate profile ---------------------
    document.getElementById("doctorImage").src = doctor.dp_url || "";
    document.getElementById("doctorName").innerText = doctor.full_name;
    document.getElementById("doctorQualification").innerText =
      doctor.qualification;

    document.getElementById("doctorExperience").innerText =
      `Experience: ${doctor.experience_years} Years`;

    document.getElementById("doctorHospital").innerText =
      `Hospital: ${doctor.clinic_hospital_name}`;

    document.getElementById("doctorFee").innerText =
      `Consultation Fee: ₹${doctor.consultation_fee}`;

    document.getElementById("doctorBio").innerText = doctor.bio;
  } catch (error) {
    console.error("Dashboard Error:", error);
    alert("Session expired. Please login again.");
    window.location.href = "../../auth/healthcare/login.html";
  }

  // ------------- Logout functionality --------------------
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/healthcare/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert("Logout failed");
        return;
      }

      // Redirect to login page
      window.location.href = "../../auth/healthcare/login.html";
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong");
    }
  });
});

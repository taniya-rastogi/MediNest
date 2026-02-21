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
    const stats = result.stats;

    document.getElementById("welcomeText").innerText =
  `Welcome back, ${doctor.full_name}`;

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

    document.getElementById("doctorEmail").innerText = `Email: ${doctor.email}`;

    document.getElementById("doctorPhone").innerText = `Phone: ${doctor.phone}`;

    document.getElementById("doctorGender").innerText =
      `Gender: ${doctor.gender}`;

    document.getElementById("doctorSpecialization").innerText =
      `Specialization: ${doctor.specialization}`;

    document.getElementById("doctorLocation").innerText =
      `Location: ${doctor.location}`;

    document.getElementById("doctorConsultationType").innerText =
      `Consultation Type: ${doctor.consultation_type}`;

    //---------------- Populate Stats ---------------------
    document.querySelector("#todayAppointmentsCount").innerText =
      stats.todayAppointments;

    document.querySelector("#totalPatientsCount").innerText =
      stats.totalPatients;

    document.querySelector("#monthlyEarningsCount").innerText =
      `₹${stats.monthlyEarnings}`;


    //---------Today's Appointments List---------
    const appointments = result.appointments;
    const tableBody = document.getElementById("appointmentsTableBody");

    tableBody.innerHTML = "";

if (appointments.length === 0) {
  tableBody.innerHTML = `
    <tr>
      <td colspan="5" class="text-center py-4 text-gray-500">
        No appointments today
      </td>
    </tr>
  `;
} else {
  appointments.forEach((appt) => {
    const row = document.createElement("tr");
    row.classList.add("border-b");

    let statusColor = "text-gray-600";

    if (appt.status === "confirmed") {
      statusColor = "text-green-600";
    } else if (appt.status === "pending") {
      statusColor = "text-yellow-600";
    } else if (appt.status === "cancelled") {
      statusColor = "text-red-600";
    }

    row.innerHTML = `
      <td class="py-3 px-4">${appt.patient_name}</td>
      <td class="py-3 px-4">
        ${appt.start_time} - ${appt.end_time}
      </td>
      <td class="py-3 px-4">${appt.description}</td>
      <td class="py-3 px-4 ${statusColor} font-medium">
        ${appt.status}
      </td>
      <td class="py-3 px-4">
        ${
          appt.status !== "cancelled"
            ? `<button 
                class="cancel-btn text-sm text-white px-3 py-1 rounded
                bg-red-500 hover:bg-red-600"
                data-id="${appt.id}">
                Cancel
              </button>`
            : "-"
        }
      </td>
    `;

    tableBody.appendChild(row);
  });
}

  } catch (error) {
    console.error("Dashboard Error:", error);
    alert("Session expired. Please login again.");
    window.location.href = "../../auth/healthcare/login.html";
  }

  // ------------- Logout functionality --------------------
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/healthcare/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );

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

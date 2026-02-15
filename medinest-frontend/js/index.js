// index.js

document.addEventListener("DOMContentLoaded", function () {
  const profileWrapper = document.getElementById("navProfileWrapper");
  const tooltip = document.getElementById("loginTooltip");

  // Show tooltip on hover (if not logged in)
  profileWrapper.addEventListener("mouseenter", async function () {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/healthcare/profile", {
        method: "GET",
        credentials: "include", // important to send HttpOnly cookie
      });

      if (!res.ok) throw new Error("Not logged in");

      // logged in → do nothing on hover
    } catch (err) {
      tooltip.classList.remove("hidden");
    }
  });

  // Hide tooltip when leaving
  profileWrapper.addEventListener("mouseleave", function () {
    tooltip.classList.add("hidden");
  });

  // Click behavior
  profileWrapper.addEventListener("click", async function () {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/healthcare/profile", {
        method: "GET",
        credentials: "include", // send HttpOnly cookie
      });

      if (!res.ok) throw new Error("Not logged in");

      const data = await res.json();

      // redirect based on role
      if (data.role === "doctor") {
        window.location.href = "/medinest-frontend/auth/healthcare/doctor_dashboard.html";
      } else if (data.role === "patient") {
        window.location.href = "/public/healthcare/patient_dashboard.html";
      }
    } catch (err) {
      // show tooltip for 3s
      tooltip.classList.remove("hidden");
      setTimeout(() => tooltip.classList.add("hidden"), 3000);
    }
  });

  // Mobile menu toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});

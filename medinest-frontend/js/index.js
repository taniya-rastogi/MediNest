document.addEventListener("DOMContentLoaded", function () {
  const profileWrapper = document.getElementById("navProfileWrapper");
  const tooltip = document.getElementById("loginTooltip");

  // Change this later based on your real login system
  let isLoggedIn = false;

  // Show tooltip on hover (if not logged in)
  profileWrapper.addEventListener("mouseenter", function () {
    if (!isLoggedIn) {
      tooltip.classList.remove("hidden");
    }
  });

  // Hide tooltip when leaving
  profileWrapper.addEventListener("mouseleave", function () {
    tooltip.classList.add("hidden");
  });

  // Click behavior
  profileWrapper.addEventListener("click", function () {
    if (isLoggedIn) {
      window.location.href = "/dashboard.html";
    } else {
      tooltip.classList.remove("hidden");

      setTimeout(function () {
        tooltip.classList.add("hidden");
      }, 3000);
    }
  });
});

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

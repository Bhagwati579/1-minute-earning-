// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Admin login check (basic)
  const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html"; // Redirect to login if not logged in
    return;
  }

  // Update greeting
  const welcomeEl = document.getElementById("welcomeAdmin");
  if (welcomeEl) {
    welcomeEl.textContent = "📋 EarnGati Admin Task Panel";
  }

  // Search feature
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll("#taskTableBody tr");
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }
});

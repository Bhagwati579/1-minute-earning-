import { database } from "./firebase.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Handle form submission
document.getElementById("referTaskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const task = document.getElementById("task").value.trim();
  const upi = document.getElementById("upi").value.trim();
  const referral = getReferralId(); // fetch from URL param

  if (!name || !task || !upi) {
    alert("Please fill in all fields.");
    return;
  }

  const taskRef = ref(database, "tasks");
  const taskData = {
    name,
    task,
    upi,
    referral,
    timestamp: Date.now(),
    paid: false
  };

  push(taskRef, taskData)
    .then(() => {
      alert("✅ Task submitted successfully via referral!");
      document.getElementById("referTaskForm").reset();
    })
    .catch((error) => {
      alert("❌ Error submitting task: " + error.message);
    });
});

// Function to get referral ID from URL
function getReferralId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("ref") || "none";
}

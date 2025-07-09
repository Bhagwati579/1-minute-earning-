// submit-task.js

// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCInD5L_WWTX9bD1sEOfkCdTt3sdGSeCo4",
  authDomain: "earngati-gpay-system.firebaseapp.com",
  databaseURL: "https://earngati-gpay-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "earngati-gpay-system",
  storageBucket: "earngati-gpay-system.appspot.com",
  messagingSenderId: "729473631351",
  appId: "1:729473631351:web:354f01b5fe32a4fe843272",
  measurementId: "G-7VT4TGL3N4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Handle form submission
const form = document.getElementById("clientForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const task = document.getElementById("task").value.trim();
  const upi = document.getElementById("upi").value.trim();

  if (!name || !task || !upi) {
    alert("❌ Please fill in all fields.");
    return;
  }

  const taskRef = ref(db, "clientTasks/");
  const newTaskRef = push(taskRef);

  set(newTaskRef, {
    name,
    task,
    upi,
    timestamp: Date.now(),
    paid: false
  })
    .then(() => {
      alert("✅ Task submitted successfully! We will verify payment shortly.");
      form.reset();
    })
    .catch((error) => {
      console.error("Error submitting task:", error);
      alert("❌ Failed to submit task. Please try again.");
    });
});

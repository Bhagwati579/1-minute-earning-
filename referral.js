// refer-firebase.js

// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Firebase config (make sure it's correct for your project)
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
const database = getDatabase(app);

// Form submission logic
const form = document.getElementById("referTaskForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const task = document.getElementById("task").value.trim();
  const upi = document.getElementById("upi").value.trim();

  const urlParams = new URLSearchParams(window.location.search);
  const refId = urlParams.get("ref") || "none";

  const taskRef = ref(database, "referralTasks/");
  const newTaskRef = push(taskRef);

  set(newTaskRef, {
    name,
    task,
    upi,
    timestamp: Date.now(),
    paid: false,
    refId: refId
  })
    .then(() => {
      alert("🎉 Referral Task Submitted Successfully!");
      form.reset();
    })
    .catch((error) => {
      console.error("❌ Error submitting referral task:", error);
      alert("Failed to submit task. Please try again.");
    });
});

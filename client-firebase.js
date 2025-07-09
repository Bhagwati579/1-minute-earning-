// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ✅ Firebase Config (Replace with your own if needed)
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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ DOM Element
const clientForm = document.getElementById("clientForm");

// ✅ Form Submit Handler
if (clientForm) {
  clientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const task = document.getElementById("taskDesc").value.trim();
    const upi = document.getElementById("clientUPI").value.trim();

    if (name && task && upi) {
      const timestamp = Date.now();
      const taskRef = ref(database, "tasks");
      const newTask = push(taskRef);

      set(newTask, {
        name: name,
        task: task,
        upi: upi,
        timestamp: timestamp,
        paid: false
      })
        .then(() => {
          alert("✅ Task submitted successfully. We will verify payment shortly!");
          clientForm.reset();
        })
        .catch((error) => {
          console.error("❌ Error submitting task:", error);
          alert("Something went wrong. Please try again.");
        });
    } else {
      alert("Please fill all fields correctly.");
    }
  });
}

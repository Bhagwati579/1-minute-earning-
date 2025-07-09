// Import Firebase App and Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Your Firebase Config
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

// Reference to tasks
const tasksRef = ref(db, "tasks");

// DOM Elements
const taskTableBody = document.getElementById("taskTableBody");
const totalTasksEl = document.getElementById("totalTasks");
const paidTasksEl = document.getElementById("paidTasks");
const unpaidTasksEl = document.getElementById("unpaidTasks");

// Show Tasks on Admin Panel
onValue(tasksRef, (snapshot) => {
  taskTableBody.innerHTML = "";
  let total = 0, paid = 0, unpaid = 0;

  snapshot.forEach((child) => {
    const task = child.val();
    const key = child.key;

    total++;
    if (task.paid) {
      paid++;
    } else {
      unpaid++;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.task}</td>
      <td>${task.upi}</td>
      <td>${task.timestamp}</td>
      <td>${task.paid ? "✅" : "❌"}</td>
      <td>
        ${!task.paid ? `<button onclick="markPaid('${key}')">Mark Paid</button>` : ""}
      </td>
    `;
    taskTableBody.appendChild(row);
  });

  totalTasksEl.textContent = total;
  paidTasksEl.textContent = paid;
  unpaidTasksEl.textContent = unpaid;
});

// Mark task as Paid
window.markPaid = function (taskId) {
  const taskRef = ref(db, `tasks/${taskId}`);
  update(taskRef, { paid: true });
};

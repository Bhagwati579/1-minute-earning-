// Import Firebase setup from admin-firebase.js
import { database, ref, onValue, update } from "./admin-firebase.js";

// DOM Elements
const taskTableBody = document.getElementById("taskTableBody");
const totalTasksSpan = document.getElementById("totalTasks");
const paidTasksSpan = document.getElementById("paidTasks");
const unpaidTasksSpan = document.getElementById("unpaidTasks");
const searchInput = document.getElementById("searchInput");

// Render tasks into the admin panel
function renderTasks(snapshot) {
  const data = snapshot.val();
  taskTableBody.innerHTML = "";

  let totalTasks = 0;
  let paidTasks = 0;
  let unpaidTasks = 0;

  for (let key in data) {
    const task = data[key];
    totalTasks++;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${task.name}</td>
      <td>${task.task}</td>
      <td>${task.upi}</td>
      <td>${task.timestamp}</td>
      <td>${task.paid ? "✅" : "❌"}</td>
      <td>
        ${task.paid ? "-" : `<button onclick="markAsPaid('${key}')">Mark Paid</button>`}
      </td>
    `;

    taskTableBody.appendChild(tr);

    if (task.paid) paidTasks++;
    else unpaidTasks++;
  }

  totalTasksSpan.textContent = totalTasks;
  paidTasksSpan.textContent = paidTasks;
  unpaidTasksSpan.textContent = unpaidTasks;
}

// Real-time listener for task updates
const tasksRef = ref(database, "tasks");
onValue(tasksRef, (snapshot) => {
  renderTasks(snapshot);
});

// Mark task as paid
window.markAsPaid = function (taskId) {
  const taskRef = ref(database, "tasks/" + taskId);
  update(taskRef, { paid: true });
};

// Search functionality by name or UPI
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const rows = taskTableBody.getElementsByTagName("tr");

  for (let row of rows) {
    const name = row.cells[0].textContent.toLowerCase();
    const upi = row.cells[2].textContent.toLowerCase();
    row.style.display = name.includes(query) || upi.includes(query) ? "" : "none";
  }
});

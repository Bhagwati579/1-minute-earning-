import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./admin-firebase.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const allowedAdminEmail = "bhagwatilalpushkarna123@gmail.com";

onAuthStateChanged(auth, (user) => {
  if (user && user.email === allowedAdminEmail) {
    loadTasks();
  } else {
    alert("Unauthorized access. You are being redirected.");
    window.location.href = "login.html";
  }
});

function loadTasks() {
  const taskRef = ref(database, "tasks/");
  onValue(taskRef, (snapshot) => {
    const data = snapshot.val();
    const tbody = document.getElementById("taskTableBody");
    tbody.innerHTML = "";

    let total = 0, paid = 0;
    for (let id in data) {
      total++;
      const task = data[id];
      if (task.paid) paid++;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.task}</td>
        <td>${task.upi}</td>
        <td>${task.timestamp}</td>
        <td>${task.paid ? "✅" : "❌"}</td>
        <td>
          <button onclick="markPaid('${id}')" class="${task.paid ? "paid" : ""}">${task.paid ? "Paid" : "Mark Paid"}</button>
        </td>
      `;
      tbody.appendChild(row);
    }

    document.getElementById("totalCount").textContent = total;
    document.getElementById("paidCount").textContent = paid;
    document.getElementById("unpaidCount").textContent = total - paid;
  });
}

window.markPaid = function (id) {
  const taskRef = ref(database, "tasks/" + id);
  update(taskRef, { paid: true });
};

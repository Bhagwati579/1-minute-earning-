import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("taskForm").addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("name").value;
    const task = document.getElementById("task").value;
    const upi = document.getElementById("upi").value;
    const taskRef = push(ref(db, "Tasks/"));
    set(taskRef, {
        name: name,
        task: task,
        upi: upi,
        timestamp: Date.now(),
        paid: false
    }).then(() => {
        alert("Task submitted successfully!");
    });
});
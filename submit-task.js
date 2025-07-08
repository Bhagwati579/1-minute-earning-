document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const task = document.getElementById("task").value;
  const upi = document.getElementById("upi").value;

  firebase.database().ref("tasks").push({
    name: name,
    task: task,
    upi: upi,
    timestamp: Date.now()
  }).then(() => {
    alert("✅ Task submitted successfully!");
    document.getElementById("taskForm").reset();
  }).catch(error => {
    alert("❌ Error: " + error.message);
  });
});
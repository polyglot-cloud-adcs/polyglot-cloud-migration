const API = "http://localhost:8080";
const tasks = ["Setup Docker Compose", "Configure Terraform"];

function renderTasks() {
  document.getElementById("taskList").innerHTML = tasks.map(t => `
    <div class="task-row">
      <div class="t-chk"><svg viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <span class="t-text">${t}</span>
      <span class="t-tag">active</span>
    </div>`).join("");
  document.getElementById("taskCount").textContent = tasks.length;
}

function addTask() {
  const inp = document.getElementById("taskInput");
  const v = inp.value.trim();
  if (!v) return;
  tasks.push(v);
  inp.value = "";
  renderTasks();
  fetch(`${API}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: v })
  }).catch(() => {});
}

document.getElementById("taskInput").addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

fetch(`${API}/api/status`)
  .then(r => r.json())
  .then(() => {
    document.getElementById("apiStatus").textContent = "Online";
  })
  .catch(() => {
    document.getElementById("apiStatus").textContent = "Offline";
    document.getElementById("apiStatus").style.color = "#f87171";
  });

renderTasks();
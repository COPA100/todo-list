document.getElementById("add-task").addEventListener("click", addTask);

let tasks = 0;
const totalTasks = document.querySelector("#total-tasks");
let compTasks = 0;
const completedTasks = document.querySelector("#completed-tasks");
let pendTasks = 0;
const pendingTasks = document.querySelector("#pending-tasks");

function addTask() {
  const input = document.querySelector(".todo-input").value;
  if (input === "") {
    const invalidDiv = document.querySelector(".invalid-input");

    invalidDiv.classList.remove("hidden");
    invalidDiv.style.transition = "0.3s ease";
    invalidDiv.style.opacity = "1";
    invalidDiv.style.transform = "translateY(0) scale(1)";

    setTimeout(() => {
      invalidDiv.style.opacity = "0";
      invalidDiv.style.transform = "translateY(-10px) scale(0.9)";

      setTimeout(() => {
        invalidDiv.classList.add("hidden");
        invalidDiv.style.opacity = "";
        invalidDiv.style.transform = "";
        invalidDiv.style.transition = "";
      }, 300);
    }, 1000);

    return;
  }

  tasks++;
  totalTasks.innerHTML = tasks;
  if (tasks === 1) document.querySelector(".no-tasks").classList.add("hidden");

  const date = document.querySelector(".todo-date").value;
  const taskList = document.getElementById("task-list");
  const item = document.createElement("li");
  item.classList.add("task-item");
  item.innerHTML = `<div class="task-info">
              <p>${input}</p>
              <p>${date}</p>
            </div>
            <div class="task-actions"> 
              <button class="complete-btn idx"><img src="./icons/checkmark.svg"></button>
              <button class="delete-btn idx"><img src="./icons/trash.svg"></button>
            </div>`;

  taskList.appendChild(item);
  document.querySelector(".todo-input").value = "";
  document.querySelector(".todo-date").value = "";
}

document.getElementById("task-list").addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) {
    removeTask(e.target.closest(".task-item"));
  }

  if (e.target.closest(".complete-btn")) {
    completeTask(e.target.closest(".task-item"));
  }
});

function removeTask(taskItem) {
  taskItem.remove();

  tasks--;
  if (pendTasks >= 1) {
    pendTasks--;
  }
  totalTasks.innerHTML = tasks;
  pendingTasks.innerHTML = pendTasks;

  if (tasks === 0) {
    document.querySelector(".no-tasks").classList.remove("hidden");
  }
}

function completeTask(taskItem) {
  taskItem.remove();
  compTasks++;
  completedTasks.innerHTML = compTasks;
  pendTasks = tasks - compTasks;
  pendingTasks.innerHTML = pendTasks;
}

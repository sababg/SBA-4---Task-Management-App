let tasksList = [];

let addNewTaskButton = document.getElementById("addNewTaskButton");
let taskFormCancelButton = document.getElementById("taskFormCancelButton");
let taskFormContainer = document.getElementById("taskFormContainer");
let taskForm = document.getElementById("taskForm");
let addNewTaskButtonContainer = document.getElementById(
  "addNewTaskButtonContainer"
);
let taskListSection = document.getElementById("taskListSection");
let taskTableBody = document.getElementById("taskTableBody");

addNewTaskButton.addEventListener("click", () => {
  changeFormDisplayClass();
  changeAddNewTaskDisplayClass();
});

taskFormCancelButton.addEventListener("click", () => {
  changeFormDisplayClass();
  changeAddNewTaskDisplayClass();
  taskForm.reset();
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = {
    name: document.getElementById("taskName").value,
    category: document.getElementById("category").value,
    deadline: document.getElementById("deadline").value,
    status: document.getElementById("status").value,
  };
  tasksList.push(task);
  taskForm.reset();
  changeFormDisplayClass();
  changeAddNewTaskDisplayClass();
  renderList();
});

const changeFormDisplayClass = () => {
  if (taskFormContainer.classList.contains("show")) {
    taskFormContainer.classList.remove("show");
    taskFormContainer.classList.add("hide");
  } else {
    taskFormContainer.classList.remove("hide");
    taskFormContainer.classList.add("show");
  }
};

const changeAddNewTaskDisplayClass = () => {
  if (addNewTaskButtonContainer.classList.contains("show")) {
    addNewTaskButtonContainer.classList.remove("show");
    addNewTaskButtonContainer.classList.add("hide");
    taskListSection.classList.remove("show");
    taskListSection.classList.add("hide");
  } else {
    addNewTaskButtonContainer.classList.remove("hide");
    addNewTaskButtonContainer.classList.add("show");
    taskListSection.classList.remove("hide");
    taskListSection.classList.add("show");
  }
};

renderList = () => {
  taskTableBody.textContent = "";
  tasksList.forEach((element) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "task-table-row";

    const nameCell = document.createElement("td");
    nameCell.textContent = element.name;
    const categoryCell = document.createElement("td");
    categoryCell.textContent = element.category;
    const deadlineCell = document.createElement("td");
    deadlineCell.textContent = element.deadline;
    const statusCell = document.createElement("td");
    statusCell.textContent = element.status;

    tableRow.appendChild(nameCell);
    tableRow.appendChild(categoryCell);
    tableRow.appendChild(deadlineCell);
    tableRow.appendChild(statusCell);
    taskTableBody.appendChild(tableRow);
  });
};

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
let taskListFilter = document.getElementById("taskListFilter");

const statuses = ["Pending", "In Progress", "Completed"];

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
  saveTasksToLocalStorage();
  taskForm.reset();
  changeFormDisplayClass();
  changeAddNewTaskDisplayClass();
  renderList(tasksList);
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

const renderList = (listItem) => {
  taskTableBody.textContent = "";
  listItem.forEach((element) => {
    createTableRow(element);
  });
};

const createTableRow = (element) => {
  const tableRow = document.createElement("tr");
  tableRow.className = "task-table-row";

  const nameCell = document.createElement("td");
  nameCell.textContent = element.name;

  const categoryCell = document.createElement("td");
  categoryCell.textContent = element.category;

  const deadlineCell = document.createElement("td");
  deadlineCell.textContent = element.deadline;

  const statusCell = document.createElement("td");

  const statusSelect = document.createElement("select");
  statuses.forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;

    if (status === element.status) {
      option.selected = true;
    }

    statusSelect.appendChild(option);
  });

  statusSelect.addEventListener("change", (e) => {
    element.status = e.target.value;
    checkFilter({ target: { value: taskListFilter.value } });
    saveTasksToLocalStorage();
  });

  statusCell.appendChild(statusSelect);
  tableRow.appendChild(nameCell);
  tableRow.appendChild(categoryCell);
  tableRow.appendChild(deadlineCell);
  tableRow.appendChild(statusCell);

  if (element.status === "Completed") {
    const completeCell = document.createElement("td");
    const completeBadge = document.createElement("div");
    completeBadge.className = "complete-task";
    completeBadge.textContent = "Completed";
    completeCell.appendChild(completeBadge);
    tableRow.appendChild(completeCell);
  } else if (dateIsValid(element.deadline)) {
    const overdueCell = document.createElement("td");
    const overdueBadge = document.createElement("div");
    overdueBadge.className = "overdue-task";
    overdueBadge.textContent = "Overdue";
    overdueCell.appendChild(overdueBadge);
    tableRow.appendChild(overdueCell);
  }

  taskTableBody.appendChild(tableRow);
};

function dateIsValid(taskDate) {
  if (
    new Date(taskDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
  ) {
    console.log("The input date is in the past.");
    return true;
  } else {
    console.log("The input date is in the future.");
    return false;
  }
}

function checkFilter(e) {
  if (!e.target.value) {
    renderList(tasksList);
    return;
  } else if (e.target.value === "Overdue") {
    renderList(tasksList.filter((item) => dateIsValid(item.deadline)));
    return;
  }
  if (!tasksList.filter((item) => item.status === e.target.value).length) {
    renderList(tasksList);
  }
  renderList(tasksList.filter((item) => item.status === e.target.value));
}

taskListFilter.addEventListener("input", checkFilter);

const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
};

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasksList");
  if (storedTasks) {
    tasksList = JSON.parse(storedTasks);
    renderList(tasksList);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromLocalStorage();
});

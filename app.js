let tasksList = [];
const statuses = ["Pending", "In Progress", "Completed"];

let addNewTaskButton = document.getElementById("addNewTaskButton");
let taskFormCancelButton = document.getElementById("taskFormCancelButton");
let taskFormContainer = document.getElementById("taskFormContainer");
let taskForm = document.getElementById("taskForm");
let taskListSection = document.getElementById("taskListSection");
let taskTableBody = document.getElementById("taskTableBody");
let taskListFilter = document.getElementById("taskListFilter");
let addNewTaskButtonContainer = document.getElementById(
  "addNewTaskButtonContainer"
);

// Add New Task
addNewTaskButton.addEventListener("click", () => {
  changeFormDisplayClass(); // Add new task button is visible, hide the form, otherwise show it
  changeAddNewTaskDisplayClass(); // Form is visible, hide the Add new task, otherwise show it
});

// Cancel Button in the new task form onClick
taskFormCancelButton.addEventListener("click", () => {
  changeFormDisplayClass();
  changeAddNewTaskDisplayClass();
  taskForm.reset(); // Reset the form
});

// Add new task in form
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = {
    name: document.getElementById("taskName").value,
    category: document.getElementById("category").value,
    deadline: document.getElementById("deadline").value,
    status: document.getElementById("status").value,
  };
  tasksList.push(task);
  saveTasksToLocalStorage(); // Add data in localStorage
  taskForm.reset();
  changeFormDisplayClass();
  changeAddNewTaskDisplayClass();
  renderList(tasksList); // show the stored data in the task table
});

// Form is visible, hide the Add new task, otherwise show it
const changeFormDisplayClass = () => {
  if (taskFormContainer.classList.contains("show")) {
    taskFormContainer.classList.remove("show");
    taskFormContainer.classList.add("hide");
  } else {
    taskFormContainer.classList.remove("hide");
    taskFormContainer.classList.add("show");
  }
};

// Add new task button is visible, hide the form, otherwise show it
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

// show the stored data in the task table
const renderList = (listItem) => {
  taskTableBody.textContent = "";
  listItem.forEach((element) => {
    createTableRow(element); // Create table row
  });
};

// Create table row
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

  // Show a select box instead of just a plain text, to give the user the ability to change the status
  statuses.forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;

    if (status === element.status) {
      option.selected = true;
    }

    statusSelect.appendChild(option);
  });

  // Update the status in table
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

  // Show the complete badge if status is completed
  if (element.status === "Completed") {
    const completeCell = document.createElement("td");
    const completeBadge = document.createElement("div");
    completeBadge.className = "complete-task";
    completeBadge.textContent = "Completed";
    completeCell.appendChild(completeBadge);
    tableRow.appendChild(completeCell);
    // Show the overdue badge if task is overdue
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

// Check if the task is overdue or not
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

// Filter function
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

// Filter the table when user select any option from select filter
taskListFilter.addEventListener("input", checkFilter);

// Save data to the localStorage
const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
};

// Read the data from the localStorage
const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasksList");
  if (storedTasks) {
    tasksList = JSON.parse(storedTasks);
    renderList(tasksList);
  }
};

// Show saved data when page is load
document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromLocalStorage();
});

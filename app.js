let tasksList = [];

let addNewTaskButton = document.getElementById("addNewTaskButton");
let taskFormCancelButton = document.getElementById("taskFormCancelButton");
let taskFormContainer = document.getElementById("taskFormContainer");
let taskForm = document.getElementById("taskForm");
let addNewTaskButtonContainer = document.getElementById(
  "addNewTaskButtonContainer"
);

addNewTaskButton.addEventListener("click", () => {
  changeFormDisplayClass();
  changeAddNewTaskDisplayClass();
});

taskFormCancelButton.addEventListener("click", () => {
  changeFormDisplayClass();
  changeAddNewTaskDisplayClass();
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
  } else {
    addNewTaskButtonContainer.classList.remove("hide");
    addNewTaskButtonContainer.classList.add("show");
  }
};

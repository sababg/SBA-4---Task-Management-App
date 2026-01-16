# Task Management App

## How the App Works

Task Management App built with vanilla JavaScript, HTML, and CSS. It allows users to create, manage, and track tasks with persistent storage using the browser's Local Storage. When you click on "Add New Task," The button will be faded, and the form will appear. In this form user must add the task name, Category, Deadline, and Status, then the user will click on Add, and the form will be reset and faded. The user can then see a table that shows the list of tasks. In this table user can change the status of the task, and it will be updated at the same time. At the top of the table user can filter the table through a select box of the statuses and overdue (the time of the task has passed, and the user has not completed the task). If the user filter the table and change the status of one of them, the task will disappear from the filtered table. The last column of the table will be shown to the user if the task is completed in a green badge or overdue in red badge. If the task is completed already, but the time is passed too, it will show only the completed badge. For the overdue, we will check the due date independent of the time, which means the task is only marked as overdue after midnight. The data will be stored and read from localStorage.

## Reflection Questions

1: The most challenging part for me was deciding how to design the page, and using one eventListener in two places without duplicating it, and using which one of these codes is better for reading the localStorage on loading the page: load eventListener on window, or onload on widows or eventListener on document.

2: For the design, I searched through some task list demo in internet, and for using the eventListener in two places, I changed my strategy. For the last part, I tested the three options, the document.addEventListener(DOMcontentloaded) was faster, and then googled the pros and cons for them, then decided which one I think is better.

3: If I have more time, I would make more pretty, and I will add some features like delete the Task or edit the whole task.

##

![Screenshot of the app](images/Screenshot%202026-01-15%20221340.png)
![Screenshot of the app](images/Screenshot%202026-01-15%20223501.png)
![Screenshot of the app](images/Screenshot%202026-01-15%20223522.png)
![Screenshot of the app](images/Screenshot%202026-01-15%20223532.png)

##

👤 Author
Saba Beigi
🌎 Charlotte, NC
💼 GitHub @sababg
📧 beigisaba@gmail.com

Feel free to reach out with questions, feedback, or ideas!

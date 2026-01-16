# Task Management App

## How the App Works

Task Management App built with vanilla JavaScript, HTML, and CSS. It allows users to create, manage, and track tasks with persistent storage using the browser's Local Storage. With click on "Add New Task" The button will be faded and the form will be appear. In this form user must add Task name, Category, Deadline, and Status, then user will click on Add and the from will be reset and faded, then user can see the a table which shows the list of the task. In this table user can change the status of the task and it will be updated at the same time. In the top of the table user has the ability to filter the table through a select box of the statuses and overdue (the time of the task is passed and user did not completed the task), If user filter the table and change the status of one of them, the task will be disappear from the filtered table. The last column of the table will be show to the user if task is completed in green badge or overdue in red badge. If the task is completed already but the time is passed too, it will show only completed badge. For the overdue, we will check the due date independent of the time, which means task only marked as a overdue ofter midnight. The data will be stored and read from localStorage.

## Reflection Questions

1: The most challenging part for me was to decided how to design the page, and using one eventListener in two places without duplicate it, and using which one of these codes is better for reading the localStorage on loading the pag : load eventListener on window or onload on widows or eventListener on document.

2: For the design I search through some task list demo in internet, for the using the eventListener in two places, I change my strategy. For the last part I test the three option and then google the pro and con for them, then decided which one I think is better.

3: If I have more time, I would make more pretty, and I will add some features like delete the Task or edit the whole task.

##

👤 Author
Saba Beigi
🌎 Charlotte, NC
💼 GitHub @sababg
📧 beigisaba@gmail.com

Feel free to reach out with questions, feedback, or ideas!

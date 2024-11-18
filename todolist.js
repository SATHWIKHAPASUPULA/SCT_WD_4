const taskInput = document.getElementById('task-input');
const taskDateInput = document.getElementById('task-date');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const taskCounter = document.getElementById('task-counter');

function updateTaskCounter() {
    const totalTasks = taskList.children.length;
    taskCounter.textContent = `Total Tasks: ${totalTasks}`;
}

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDateTime = taskDateInput.value;

    if (taskText === "" || taskDateTime === "") {
        alert("Please enter a task and set a date/time.");
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText} (Due: ${new Date(taskDateTime).toLocaleString()})</span>
        <div class="task-buttons">
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    taskList.appendChild(li);

    const completeBtn = li.querySelector('.complete-btn');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    editBtn.addEventListener('click', () => {
        const newTask = prompt("Edit your task", taskText);
        const newDateTime = prompt("Edit your task due date/time", taskDateTime);

        if (newTask && newDateTime) {
            li.querySelector('span').textContent = `${newTask} (Due: ${new Date(newDateTime).toLocaleString()})`;
        }
    });

    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        updateTaskCounter();
    });

    taskInput.value = '';
    taskDateInput.value = '';
    updateTaskCounter();
}

function clearCompletedTasks() {
    const completedTasks = taskList.querySelectorAll('.completed');
    completedTasks.forEach(task => taskList.removeChild(task));
    updateTaskCounter();
}

addTaskBtn.addEventListener('click', addTask);
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

updateTaskCounter();

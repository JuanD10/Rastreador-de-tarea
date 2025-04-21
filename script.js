let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const description = taskInput.value.trim();

    if (description) {
        tasks.push({ description, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const orderedTasks = [
        ...tasks.filter(t => !t.completed),
        ...tasks.filter(t => t.completed)
    ];

    orderedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));

        const desc = document.createElement('span');
        desc.className = 'description';
        desc.textContent = task.description;

        const delButton = document.createElement('button');
        delButton.innerHTML = '🗑️';
        delButton.addEventListener('click', () => deleteTask(index));

        li.appendChild(checkbox);
        li.appendChild(desc);
        li.appendChild(delButton);
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

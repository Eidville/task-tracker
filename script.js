const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';
    if (task.completed) taskDiv.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.addEventListener('click', () => toggleTask(index));

    taskDiv.appendChild(span);
    taskDiv.appendChild(completeBtn);
    taskDiv.appendChild(deleteBtn);
    taskList.appendChild(taskDiv);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return alert('Task cannot be empty!');

  tasks.push({ text: taskText, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.getElementById('addTaskBtn').addEventListener('click', addTask);

renderTasks();

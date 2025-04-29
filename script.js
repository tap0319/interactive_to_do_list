const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const notification = document.getElementById('notification');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement({ text: taskText, completed: false });
  saveTask({ text: taskText, completed: false });

  showNotification("Task added successfully!", 'success'); 

  taskInput.value = '';
}

function createTaskElement(taskData) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskData.text;
  span.classList.add('task-text');

  if (taskData.completed) {
    li.classList.add('completed');
  }

  // Toggle completed
  span.addEventListener('click', function () {
    li.classList.toggle('completed');
    toggleCompletedInStorage(taskData.text);
    if (li.classList.contains('completed')) {
      showNotification("Task marked as completed!", 'success');
    }
  });

  // Delete task
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '❌';
  deleteBtn.addEventListener('click', function () {
    li.remove();
    deleteTaskFromStorage(taskData.text);
    showNotification("Task deleted!", 'error');
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => createTaskElement(task));
}

function deleteTaskFromStorage(taskText) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleCompletedInStorage(taskText) {
  const tasks = getTasks();
  const task = tasks.find(t => t.text === taskText);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Notification system
function showNotification(message, type = 'success') {
  notification.textContent = message;
  notification.className = 'notification show'; // reset classes

  if (type === 'success') {
    notification.style.backgroundColor = '#4CAF50'; // green
  } else if (type === 'error') {
    notification.style.backgroundColor = '#f44336'; // red
  }

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

//show notofication icon //

function showNotification(message, type) {
  notification.textContent = message;

  let soundId = '';

  switch (type) {
    case 'success': // Completed
      notification.style.backgroundColor = '#28a745';
      soundId = 'sound-complete';
      break;
    case 'error': // Deleted
      notification.style.backgroundColor = '#dc3545';
      soundId = 'sound-delete';
      break;
    case 'info': // Added
      notification.style.backgroundColor = '#007bff';
      soundId = 'sound-add';
      break;
    default:
      notification.style.backgroundColor = '#333';
  }

  if (soundId) {
    const audio = document.getElementById(soundId);
    audio.currentTime = 0; // rewind
    audio.play();
  }

  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}


// update//

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement({ text: taskText, completed: false });
  saveTask({ text: taskText, completed: false });

  showNotification("Task added!", 'info'); 
  taskInput.value = '';
}

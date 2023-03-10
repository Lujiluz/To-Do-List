// event listeners
window.addEventListener('load', (e) => {
  loadTasks();
});
document.querySelector('.submitForm').addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});

document.querySelector('.clearListBtn').addEventListener('click', (e) => {
  e.preventDefault();
  clearAll();
});

document.querySelector('.dark-mode-btn').addEventListener('click', (e) => {
  e.preventDefault();
  darkMode();
});

const filterList = document.getElementsByClassName('filterList')[0];

filterList.addEventListener('input', (e) => {
  e.preventDefault();
  filterTasks(filterList);
});
//add task function
function addTask() {
  const task = document.querySelector('.submitField');
  const list = document.getElementsByTagName('ul')[0];
  // return and give alert if task is empty
  if (task.value === '') {
    alert('please add some task!');
    return false;
  }
  //check is task already exist, if true show alert
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert('Task already exist!');
    task.value = '';
    return false;
  }
  // // add task to local storage
  // console.log(JSON.stringify([...JSON.parse(localStorage.getItem('tasks') || '[]'), { task: task.value, completed: false }]));
  localStorage.setItem('tasks', JSON.stringify([...JSON.parse(localStorage.getItem('tasks') || '[]'), { task: task.value, completed: false }]));
  // // create list item, add innerHTML and app end to ul
  const li = document.createElement('li');
  li.innerHTML = `
  <input type="checkbox" onclick="taskCompleted(this)" class="check">
  <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
  <i class="far fa-times-circle" style="cursor: pointer" onclick="deleteTask(this)"></i>
  `;

  list.appendChild(li);
  // clear input
  task.value = '';
}

// Completed task function
function taskCompleted(event) {
  // get all tasks from localStorage
  let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
  // if task === input value, set completed to true
  tasks.forEach((task) => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  // update localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // add class 'completed' on input to give checked effect
  event.nextElementSibling.classList.toggle('completed');
  event.nextElementSibling.toggleAttribute('readonly');
}
// edit task function
// store current task to track changes
let currentTask = null;
// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}
// edit the task and update local storage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
  console.log(tasks);
  // check if task is empty
  if (event.value === '') {
    alert('Task is empty. Please add some task!');
    event.value = currentTask;
    return;
  }
  // task already exist
  tasks.forEach((task) => {
    if (task.task === event.value && task.task !== currentTask) {
      alert('Task is already exist!');
      event.value = currentTask;
      return;
    }
  });
  // update task
  tasks.forEach((task) => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  // update local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task function
function deleteTask(event) {
  if (confirm('Are you sure you want to delete this task?')) {
    let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
    tasks.forEach((task) => {
      if (task.task === event.parentNode.children[1].value) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    event.parentElement.remove();
  }
}

// load task from localStorage function
function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem('tasks') === null) return;
  // get the tasks from localStorage, then add it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
  // loop through the tasks, and add them to the list
  tasks.forEach((task) => {
    const ul = document.getElementsByTagName('ul')[0];
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" onclick="taskCompleted(this)" class="check">
    <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="far fa-times-circle" style="cursor: pointer" onclick="deleteTask(this)"></i>
    `;

    ul.appendChild(li);
  });
}

// clear all tasks function
function clearAll() {
  const ul = document.querySelector('ul');
  if (ul.innerHTML === '') {
    alert('There is no tasks yet!');
    return;
  }
  if (confirm('Are you sure to clear all tasks?')) {
    localStorage.clear();
    document.querySelector('ul').innerHTML = '';
  }
}

// filter tasks
function filterTasks(event) {
  // get value from input
  let text = event.value.toLowerCase();
  // get tasks
  const tasks = document.querySelectorAll('li');
  // check each value
  tasks.forEach((task) => {
    let item = task.children[1];
    if (item.value.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Switching to Dark Mode Function
function darkMode() {
  const body = document.body;
  const container = document.querySelector('.container');
  const darkModeBtn = document.querySelector('.dark-mode-btn');
  const githubIcon = document.querySelector('.github-icon');
  const submitField = document.querySelector('.submitField');
  const submitBtn = document.querySelector('.submitBtn');
  const filterList = document.querySelector('.filterList');
  const clearListBtn = document.querySelector('.clearListBtn');
  const tasks = document.querySelectorAll('.task');
  let allElements = [container, darkModeBtn, githubIcon, submitField, submitBtn, filterList, clearListBtn];

  // darkModeBtn
  let appereanceValue = darkModeBtn.firstElementChild.getAttribute('src');

  if (appereanceValue === './img/moon-24.png') {
    darkModeBtn.firstElementChild.setAttribute('src', './img/sun-24.png');
    // when button is darkModeBtn
    body.classList.add('body-darkmode');
    allElements.forEach((element) => {
      element.classList.add(element.getAttribute('class') + '-darkmode');
    });
    // dark mode styling for tasks
    tasks.forEach((task) => {
      task.classList.add(task.classList[0] + '-darkmode');
    });
  } else {
    // back to light mode
    darkModeBtn.firstElementChild.setAttribute('src', './img/moon-24.png');
    body.classList.remove('body-darkmode');
    allElements.forEach((element) => {
      element.classList.remove(element.classList[0] + '-darkmode');
    });
    // back to light mode styling for tasks
    tasks.forEach((task) => {
      task.classList.remove(task.classList[0] + '-darkmode');
    });
  }
}

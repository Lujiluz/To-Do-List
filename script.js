// event listeners
window.addEventListener('load', (e) => {
  loadTasks();
});
document.querySelector('.submitForm').addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
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
  //FIXME: check is task already exist, if true show alert (I should check it without get item from localStorage)
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
  <input type="checkbox" onclick="taskComplete(this)" class="check">
  <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
  `;

  list.appendChild(li);
  // clear input
  task.value = '';
}
// TODO: edit task function

// store current task to track changes
// get current task
// edit the task and update local storage
// check if task is empty
// task already exist
// update task
// update local storage

// TODO: delete task function

// delete selected task from local storage by splicing
// delete selected task from the page

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
    <input type="checkbox" onclick="taskComplete(this)" class="check">
    <input type="text" value="${task.task}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    `;

    ul.appendChild(li);
  });
}

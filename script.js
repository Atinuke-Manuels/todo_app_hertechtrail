      //code to create light and dark mode
const toggle  = document.getElementById('moonImg');
const body    = document.querySelector('body');
const wrapper = document.getElementById('wrapper');
const control = document.querySelector('.controls, li');
const list    = document.getElementsByClassName('.task-item');
const ul      = document.querySelector('ul');

toggle.addEventListener('click', function() {
  if (this.src.includes('icon-moon')) {
    this.src = './images/icon-sun.svg';
    body.classList.add('dark-mode');
    wrapper.style.backgroundImage       = "url('./images/bg-desktop-dark.jpg')"
    body.style.background               = 'hsl(237, 14%, 26%)';
    control.style.backgroundColor       = 'hsl(237, 14%, 26%)';
    listContainer.style.backgroundColor = 'hsl(237, 14%, 26%)';
    list.style.backgroundColor          = 'hsl(237, 14%, 26%)';
    ul.style.backgroundColor            = 'hsl(237, 14%, 26%)';
    body.style.color                    = 'white';
  } else {
    this.src = './images/icon-moon.svg';
    body.classList.remove('dark-mode');
    wrapper.style.backgroundImage       = "url('./images/bg-desktop-light.jpg')"
    body.style.background               = 'hsl(233, 11%, 84%)';
    control.style.backgroundColor       = 'hsl(233, 11%, 84%)';
    listContainer.style.backgroundColor = 'hsl(233, 11%, 84%)';
    list.style.backgroundColor          = 'hsl(233, 11%, 84%)';
    ul.style.backgroundColor            = 'hsl(233, 11%, 84%)';
    body.style.color                    = 'hsl(235, 21%, 11%)';
  }

  
});

function toggleMode() {
  const ul   = document.querySelector('ul');
  const body = document.querySelector('body');
  if (body.classList.contains('dark-mode')) {
    ul.classList.add('dark');
  } else {
    ul.classList.remove('dark');
  }
}


      //code to display current date

const newDate           = document.getElementById('date');
const date              = new Date();
const options           = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
const currentDate       = new Intl.DateTimeFormat('en-GB', options).format(date);
      newDate.innerHTML = currentDate;


      //code to control task input

const taskInput     = document.getElementById('inputField');
const addMeBtn      = document.getElementById('addMeBtn');
const listContainer = document.querySelector('.task-list');
const clearAll      = document.querySelector('.clear-all-btn');

      // Retrieve list items from local storage
let   tasks   = JSON.parse(localStorage.getItem('tasks')) || [];
const newTask = document.createElement('li');
  newTask.classList.add('task-item');  

      // Add existing tasks to the list
for (let i = 0; i < tasks.length; i++) {
const newTask = document.createElement('li');
  newTask.classList.add('task-item');  
        newTask.innerHTML = `
    <input type = "checkbox" id = "task${i}">
    <label for  = "task${i}">${tasks[i]}</label>
  `;
  const deleteButton       = document.createElement("button");
        deleteButton.style = "background-color: red; color: white; border: none; padding: 3px; border-radius: 5px;"
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener('click', function(event) {
    if (confirm('Are you sure you want to delete this task?')) {
      event.target.parentNode.remove();
      updateLocalStorage();
    }
    updateTaskCount();
  });
  newTask.appendChild(deleteButton);
  listContainer.appendChild(newTask);
}

      // Add new tasks to the list
addMeBtn.addEventListener('click', function(event) {
        //to ensure each new task appears on the window till deleted.
  event.preventDefault();
  let userTask = taskInput.value.trim();
  if (userTask) {
    
    const newTask           = document.createElement('li');
          newTask.innerHTML = `
      <input onclick = "updateStatus(this)" type = "checkbox" id = "task${tasks.length}">
      <label for     = "task${tasks.length}">${userTask}</label>
    `;

        //Create a delete button and append same to each list item
    const deleteButton       = document.createElement("button");
          deleteButton.style = "background-color: red; color: white; border: none; padding: 3px; border-radius: 5px;"
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "Delete";

    deleteButton.addEventListener('click', function(event) {
      if (confirm('Are you sure you want to delete this task?')) {
        event.target.parentNode.remove();
        updateLocalStorage();
      }
    });
    newTask.appendChild(deleteButton);
    listContainer.appendChild(newTask);
    tasks.unshift(userTask);
    updateLocalStorage();
    taskInput.value = '';
  }
updateLocalStorage();
      //to update the count of active tasks
  updateTaskCount();
});

    // function to count active tasks 
function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add('checked');
        newTask[selectedTask.id].status = 'completed';
    }else {
        taskName.classList.remove('checked');
        newTask[selectedTask.id].status = 'pending';

    }
    updateTaskCount();
}

      // Update local storage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

    //Clears all tasks in the list
clearAll.addEventListener('click', function() {
  if (confirm('Do you really want to clear all tasks?')) {
    listContainer.innerHTML = '';
    tasks                   = [];
    updateLocalStorage();
  }
  updateTaskCount();

});

      //clears all completed/checked Items
  function clearCheckedTasks() {
  const listItems = listContainer.querySelectorAll('li');
  listItems.forEach(function(item) {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      item.remove();
    }
  });
  updateLocalStorage(); 
  updateTaskCount();
}

      //counts the active todo Items
function updateTaskCount() {
  const uncheckedTasks               = document.querySelectorAll('li:not(.checked)');
  const taskCount                    = uncheckedTasks.length;
  const taskCountElement             = document.getElementById('active');
        taskCountElement.textContent = taskCount;
}

  // This helps display all completed tasks.
function showCompletedTasks() {
  const taskItems = document.querySelectorAll('.task-item');

  taskItems.forEach(taskItem => {
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    const label = taskItem.querySelector('label');

    if (checkbox.checked) {
      taskItem.style.display = 'flex';
    } else {
      taskItem.style.display = 'none';
    }
  });
}
showCompletedTasks() ;

  //To show all task again
function showAllTasks() {
  const taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(task => {
    task.style.display = 'flex';
  });
}

showAllTasks();

  // function showCompleted() {
  //   const taskItems = document.querySelectorAll('.task-item');
  //   taskItems.forEach(task => {
  //     const checkbox = task.querySelector('input[type="checkbox"]');
  //     const label = task.querySelector('label');
  //     if (checkbox.checked) {
  //       task.style.display = 'none';
  //     } else {
  //       task.style.display = 'flex';
  //     }
  //   });
  //   showAllTasks();
  // }




let tasks = {
    inProgress: [],
    completed: []
  };
  
  function addTodo() {
    const input = document.getElementById('todoInput');
    const task = input.value.trim();
    
    if (task) {
      tasks.inProgress.push(task);
      input.value = '';
      updateLists();
    }
  }
  
  function completeTodo(index) {
    const task = tasks.inProgress[index];
    tasks.inProgress.splice(index, 1);
    tasks.completed.push(task);
    updateLists();
  }
  
  function undoTodo(index) {
    const task = tasks.completed[index];
    tasks.completed.splice(index, 1);
    tasks.inProgress.push(task);
    updateLists();
  }
  
  function updateLists() {
    const inProgressList = document.getElementById('inProgressList');
    const completedList = document.getElementById('completedList');
    
    inProgressList.innerHTML = tasks.inProgress
      .map((task, index) => `
        <li>
          <span>${task}</span>
          <button class="complete-btn" onclick="completeTodo(${index})">Complete</button>
        </li>
      `).join('');
      
    completedList.innerHTML = tasks.completed
      .map((task, index) => `
        <li>
          <span>${task}</span>
          <button class="undo-btn" onclick="undoTodo(${index})">Undo</button>
        </li>
      `).join('');
  }
  
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.todo-list').forEach(list => list.classList.remove('active'));
      
      button.classList.add('active');
      document.getElementById(button.dataset.tab).classList.add('active');
    });
  });
  
  updateLists();
  

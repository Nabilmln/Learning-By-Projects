const input = document.getElementById('taskInput');
const addButton = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

addButton.addEventListener('click', addTask);

input.addEventListener('keyoress', (e) => {
    if(e.key === 'Enter'){
        addTask();
    }
});

function addTask(){
        const text = input.value.trim();
        
        if (!text) return;
        
        const task = {
            id: Date.now(),
            text: text,
            completed: false
        }
    
        tasks.push(task);
        input.value = '';
        renderTasks();
    }

function renderTasks(){
    taskList.innerHTML = '';

    const sortedTasks =[...tasks].sort((a,b) => a.completed - b.completed);

    sortedTasks.forEach(task => { 
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox">
            <span>${task.text}</span>
            <button>🗑</button>`;

        const checkbox = li.querySelector('input');
        const span = li.querySelector('span');
        const deleteBtn = li.querySelector('button');

        checkbox.checked = task.completed;

        if(task.completed){
            span.classList.add('completed');
        }

        checkbox.addEventListener('change', () => {
            task.completed = !task.completed;
            renderTasks();
        });

        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        taskList.appendChild(li);
    });
}
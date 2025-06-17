const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const themeBtn = document.getElementById('toggle-theme');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.done) li.classList.add('done');


        li.addEventListener('click', () => {
            todos[index].done = !todos[index].done;
            saveTodos();
            renderTodos();
        });

      
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '🗑️';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        li.appendChild(removeBtn);
        todoList.appendChild(li);
    });

    updateStats();
}

function updateStats() {
    const totalCount = todos.length;
    const completedCount = todos.filter(todo => todo.done).length;

    document.getElementById('total-count').textContent = totalCount;
    document.getElementById('completed-count').textContent = completedCount;
}

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== '') {
        todos.push({ text, done: false });
        input.value = '';
        saveTodos();
        renderTodos();
    }
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});


const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '🌞 Light Mode';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? '🌞' : '🌚';
});


renderTodos();

// Load data from db.json
function loadTodos() {
    const username = localStorage.getItem('username');
    const todos = JSON.parse(localStorage.getItem('todos_' + username)) || [];
    return todos;
}


// Save data to db.json
function saveTodos(todos) {
    const db = JSON.parse(localStorage.getItem('db')) || { users: [] };
    const username = localStorage.getItem('username');
    let user = db.users.find(user => user.username === username);

    if (user) {
        user.todos = todos;
    } else {
        db.users.push({ username: username, todos: todos });
    }

    localStorage.setItem('db', JSON.stringify(db));
    localStorage.setItem('todos_' + username, JSON.stringify(todos)); // Store todos in localStorage with the username as a key
}


function addTodo() {
    const todoInput = document.getElementById("newTodo");
    const text = todoInput.value;
    if (text === "") {
        return;
    }

    let todos = loadTodos();

    const Todo = {
        id: Date.now(),
        text: text,
        isDone: false,
        createdBy: localStorage.getItem('username') // Store the creator's username
    };
    todos.push(Todo);
    todoInput.value = "";
    saveTodos(todos);
    renderTodos();
}


function deleteTodo(id) {
    let todos = loadTodos();
    todos = todos.filter(Todo => Todo.id !== id);
    saveTodos(todos);
    renderTodos();
}

function filterTodos() {
    const filterTodo = document.getElementById("filter");
    const filterStatus = filterTodo.value;
    renderTodos(filterStatus);
}

function editTodoText(id) {
    let todos = loadTodos();
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        const newText = prompt('Edit todo:', todo.text);
        if (newText !== null) {
            todo.text = newText;
        }
    }
    saveTodos(todos);
    renderTodos();
}

function toggleTodo(id, currentFilter) {
    let todos = loadTodos();
    for (let index in todos) {
        if (id === todos[index].id) {
            todos[index].isDone = !todos[index].isDone;
        }
    }
    saveTodos(todos);
    renderTodos(currentFilter);
}

function renderTodos(filter = 'all') {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    let todos = loadTodos();
    let filteredTodos = todos;

    if (filter === 'done') {
        filteredTodos = todos.filter(todo => todo.isDone);
    } else if (filter === 'undone') {
        filteredTodos = todos.filter(todo => !todo.isDone);
    }

    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isDone;
        checkbox.onchange = () => toggleTodo(todo.id, filter);

        const text = document.createElement('input');
        text.type = 'text';
        text.value = todo.text;
        text.readOnly = true;

        const editTodoBtn = document.createElement('button');
        editTodoBtn.textContent = 'Edit';
        editTodoBtn.onclick = () => editTodoText(todo.id);

        const deleteTodoBtn = document.createElement('button');
        deleteTodoBtn.textContent = 'Delete';
        deleteTodoBtn.onclick = () => deleteTodo(todo.id);

        todoItem.appendChild(checkbox);
        todoItem.appendChild(text);
        todoItem.appendChild(editTodoBtn);
        todoItem.appendChild(deleteTodoBtn);
        todoList.appendChild(todoItem);
    });
}

// Initial call to renderTodos when the page loads
document.addEventListener('DOMContentLoaded', renderTodos);


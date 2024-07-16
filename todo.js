var todos = []

function addTodo(){
    var todoInput = document.getElementsByName("newTodo")
    var text = todoInput.values
    var Todo = {
        id: Date.now(),
        text: text,
        isDone: false
    }
    todos.push(Todo) 
    todoInput.values = ""
    renderTodos()
}

function deleteTodo(){
    renderTodos()
}

function filterTodos(){
    renderTodos()
}

function editTodoText(){
    renderTodos()
}

function toggleTodo(){
    renderTodos()
}

function renderTodos(){

}
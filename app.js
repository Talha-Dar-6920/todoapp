function addTodo() {

    var todoText = document.getElementById('todoText');
    if (todoText.value.trim()) {
        var listItem = document.createElement('li');
        var listItemId = 'list-item-' + todoList.childNodes.length;
        listItem.setAttribute('id', listItemId);

        var editBtn = document.createElement('button');
        var deleteBtn = document.createElement('button');

        editBtn.className = 'edit';
        deleteBtn.className = 'delete';

        editBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";
        editBtn.onclick = function(ev) {
            console.log(ev)
            return editListItem(listItemId);
        };
        deleteBtn.onclick = function() {
            return deleteListItem(listItemId);
        };
        listItem.innerText = todoText.value;

        todoList.appendChild(listItem);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);

        todoText.value = "";
    }
}

var todoList = document.getElementById('list');
var addTodoBtn = document.getElementById('addTodo');
var deleteAllBtn = document.getElementById('deleteAll');
deleteAllBtn.onclick = deleteAllTodos;

function deleteListItem(id) {
    var listItemToDelete = document.getElementById(id);
    todoList.removeChild(listItemToDelete);

}

function saveEdit(id) {
    var todoText = document.getElementById('todoText');
    var listItemToEdit = document.getElementById(id);
    listItemToEdit.firstChild.nodeValue = todoText.value;
    todoText.value = "";
    addTodoBtn.innerText = "Add Todo";
    addTodoBtn.onclick = addTodo;

}

function editListItem(id) {
    var listItemToEdit = document.getElementById(id);
    var todoText = document.getElementById('todoText');
    var todoItemText = listItemToEdit.firstChild.nodeValue;
    todoText.value = todoItemText;
    addTodoBtn.innerText = 'Save';
    addTodoBtn.onclick = function() {
        return saveEdit(id);
    }

}

function deleteAllTodos() {
    todoList.innerHTML = "";

}
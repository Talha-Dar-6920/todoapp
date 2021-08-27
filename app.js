const inputEl = document.getElementById('todoText');
const addBtn = document.getElementById('addTodo');
const deleteAllBtn = document.getElementById('deleteAll');
const todoListEl = document.getElementById('list');
let itemId;

//? Firebase Data Request
const request = (id, obj = {}) =>
    fetch(`https://todo-29872-default-rtdb.firebaseio.com/${id}.json`, obj);

//? Fetch Todos from FireBase
const renderTodos = async() => {
    const response = await request('/todos');
    const res = await response.json();

    for (const todo in res) {
        createTodo(res[todo], todo);
    }
};

//? Render Todos on Startup
renderTodos();

//? Single Element Edit Handler
const editHandler = (e) => {
    inputEl.value = e.target.previousSibling.textContent;
    addBtn.textContent = 'Save';
    itemId = e.target;
};

//? Single Element Delete Handler
const deleteHandler = (e) => {
    const id = e.target.parentElement.id;
    if (!itemId) {
        e.target.parentElement.remove();
        request(`/todos/${id}`, { method: 'DELETE' });
    }
};

//? Create a Todo Item
const createTodo = (value, id) => {
    const liEl = document.createElement('li');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    editBtn.addEventListener('click', editHandler);
    deleteBtn.addEventListener('click', deleteHandler);

    liEl.id = id;
    editBtn.className = 'edit';
    editBtn.textContent = 'edit';
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'delete';
    liEl.textContent = value;
    liEl.append(editBtn, deleteBtn);
    todoListEl.appendChild(liEl);
};

//? Add and Edit Handler Function
const addElementHandler = (e) => {
    const inputValue = inputEl.value;

    if (inputValue.trim() && !itemId) {
        request('/todos', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then((res) => res.json())
            .then((r) => createTodo(inputValue, r.name));
    }

    if (inputValue.trim() && itemId) {
        const id = itemId.parentElement.id;
        addBtn.textContent = 'Add Todo';
        itemId.previousSibling.textContent = inputEl.value;
        itemId = undefined;

        request(`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(inputValue),
            headers: {
                'content-type': 'application/json',
            },
        });
    }

    inputEl.value = '';
};

//? Add New Element
addBtn.addEventListener('click', addElementHandler);

document.addEventListener('keypress', (e) => {
    if (e.charCode === 13) addElementHandler();
});

//? Delete All Elements
deleteAllBtn.addEventListener('click', (e) => {
    if (!itemId) {
        todoListEl.innerHTML = '';
        request('/todos', { method: 'DELETE' });
    }
});
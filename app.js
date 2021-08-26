const inputEl = document.getElementById('todoText');
const addBtn = document.getElementById('addTodo');
const deleteAllBtn = document.getElementById('deleteAll');
const todoListEl = document.getElementById('list');
let bool = true;
let editItem;

//? Single Element Edit Handler
const editHandler = (e) => {
    inputEl.value = e.target.previousSibling.textContent;
    bool = false;
    addBtn.textContent = 'Save';
    editItem = e.target;
};

//? Single Element Delete Handler
const deleteHandler = (e) => {
    if (bool) e.target.parentElement.remove();
};

//? Add and Edit Handler Function
const addElementHandler = (e) => {
    const inputValue = inputEl.value;

    if (inputValue.trim() && bool) {
        const liEl = document.createElement('li');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        editBtn.addEventListener('click', editHandler);
        deleteBtn.addEventListener('click', deleteHandler);

        editBtn.className = 'edit';
        editBtn.textContent = 'edit';
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'delete';
        liEl.textContent = inputValue;
        liEl.append(editBtn, deleteBtn);
        todoListEl.appendChild(liEl);

        inputEl.value = '';
    }

    if (inputValue.trim() && !bool) {
        bool = true;
        addBtn.textContent = 'Add Todo';

        editItem.previousSibling.textContent = inputEl.value;

        inputEl.value = '';
    }
};

//? Add New Element
addBtn.addEventListener('click', addElementHandler);

document.addEventListener('keypress', (e) => {
    if (e.charCode === 13) addElementHandler();
});

//? Delete All Elements
deleteAllBtn.addEventListener('click', (e) => {
    if (bool) todoListEl.innerHTML = '';
});
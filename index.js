// Retrieve the todo list from local storage if it exists
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Get references to the necessary DOM elements
const input = document.getElementById('myInput');
const addButton = document.getElementById('addButton');
const list = document.getElementById('listParent');

// Create a function to display the todo list items
function displayList() {
    // Clear the current contents of the list element
    list.innerHTML = '';
    // Display the todo list items in reverse order (most recent first)
    for (let i = todoList.length - 1; i >= 0; i--) {
        const listItem = document.createElement('li');
        listItem.innerText = todoList[i].task;
        // Create a trash icon and add an event listener to remove the todo item when clicked
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa', 'fa-trash-o', 'trash');
        trashIcon.setAttribute('data-index', i);
        trashIcon.addEventListener('click', removeItem);
        listItem.appendChild(trashIcon);
        // Append the todo item to the list
        list.appendChild(listItem);
    }
}

// Create a function to add a new todo item to the list
function newItem() {
    // Get the value of the input field and trim any leading/trailing whitespace
    const newTask = input.value.trim();
    // Make sure the input field is not empty
    if (newTask !== '') {
        // Add the new todo item to the beginning of the todo list array
        todoList.unshift({task: newTask});
        // Reset the input field
        input.value = '';
        // Display the updated todo list
        displayList();
        // Store the updated todo list in local storage
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }
}

// Create a function to remove a todo item from the list
function removeItem() {
    // Get the index of the todo item to be removed from the data-index attribute of the trash icon
    const index = this.getAttribute('data-index');
    // Remove the todo item from the todo list array
    todoList.splice(index, 1);
    // Display the updated todo list
    displayList();
    // Store the updated todo list in local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Call the displayList function on page load to show any existing todo items
displayList();


// Get references to the input field and the list container from the DOM
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Adds a new task to the list when the user clicks the "Add" button
function addTask() {
    if (inputBox.value === '') {
        // Warn the user if they try to add an empty task
        alert("You must write something to add!");
    } else{
        // Create a new list item and set its text to the input value
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Create a delete (×) button and append it to the list item
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Immediately hide the parent task element when the delete (×) button is clicked
        // Note: the list container's click listener also handles complete removal via .remove()
        span.onclick = function() {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
    // Clear the input field after adding the task
    inputBox.value = "";
    saveData();

}

// Listen for clicks on the list container to handle checking/unchecking and deleting tasks
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        // Toggle the "checked" class to mark or unmark a task as complete
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        // Remove the task from the DOM when the delete button is clicked
        e.target.parentElement.remove();
        saveData();
    }
},false);

// Save the current list HTML to localStorage so tasks persist on page reload
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load and display tasks saved in localStorage when the page loads
function showSavedTasks() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showSavedTasks();



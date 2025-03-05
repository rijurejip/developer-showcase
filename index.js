const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list")) || [];

list.forEach(task => toDoList(task));

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    toDoList();
});

function toDoList(task) {
    let newTask = inputEl.value;
    if (task) {
        newTask = task.name;
    }
    if (!newTask.trim()) return;

    const liEl = document.createElement("li");
    liEl.innerText = newTask;
    if (task && task.checked) {
        liEl.classList.add("checked");
    }

    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "❌";
    deleteBtn.classList.add("delete-btn");
    liEl.appendChild(deleteBtn);
    
    deleteBtn.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    });

    ulEl.appendChild(liEl);
    inputEl.value = "";
    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = [...ulEl.children].map(li => ({
        name: li.firstChild.textContent,
        checked: li.classList.contains("checked"),
    }));
    localStorage.setItem("list", JSON.stringify(tasks));
}

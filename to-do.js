"use strict";

const textAreaElement = document.querySelector(".inputText");
//const addButton = document.querySelector(".add-card");
const updateButton = document.querySelector(".edit-text");
const dateInputElement = document.getElementById("dateItem");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const textElements = document.querySelectorAll(".list-text");
const inputElement = document.querySelector(".inputText");
const clearAllBtn = document.getElementById("clearAll");
// const deleteBtn = document.querySelectorAll("#delBtn");
const deleteAnItem = document.getElementById("deleteOneItem");
const addBtn = document.getElementById("addBtn");

const cancelBtn = document.getElementById("cancelBtn");
const cancelButton = document.getElementById("cancelButton");

const confirmBtn = document.getElementById("confirm");
const modal = document.getElementById("modal");
const modalDelete = document.getElementById("modalDelete");
const textItem = document.getElementById("textItem");
// let dateItem = dateInputElement.value.trim();

let todo = [];
let editMode = false;
let editIndex;

addBtn.addEventListener("click", () => {
  if (textItem.value.length === 0) {
    alert("Cannot add blank space");
    return;
  }
  if (!editMode) {
    todo.unshift({
      list: textItem.value,
      date: dateInputElement.value,
      completed: false
    });
  } else {
    todo[editIndex].list = textItem.value;
    todo[editIndex].date = dateItem.value;
    document.getElementById(`item${editIndex}`).style.opacity = 1;
  }
  textItem.value = "";
  dateInputElement.value = "";
  editMode = false;

  addBtn.innerHTML = "Add Todo";

  saveTodo();
  renderTodo();
});

// function addTodo() {
//   // console.log({ textItem, dateItem });
//   alert(textItem);
//   if (textItem.length === 0) {
//     alert("Cannot add blank space");
//     return;
//   }

//   // addButton.innerHTML = "Add Todo";

//   if (!editMode) {
//     todo.unshift({
//       list: textItem,
//       date: dateInputElement.value,
//       completed: false
//     });
//   } else {
//     todo[editIndex].list = textItem;
//     todo[editIndex].date = dateItem;
//     document.getElementById(`item${editIndex}`).style.opacity = 1;
//   }
//   inputElement.value = "";
//   dateInputElement.value = "";
//   editMode = false;

//   saveTodo();
//   renderTodo();
// }

function renderTodo() {
  let todoHTML = "";
  for (let i = 0; i < todo.length; i++) {
    const todoElement = todo[i];
    const list = todoElement.list;
    const date = todoElement.date;
    const completed = todoElement.completed || false;
    const html = `
  
      <li id="item${editIndex === i ? editIndex : ""}">
        <div id="textCont">
                    <input type="checkbox" id="checkbox-${i}" ${
      todoElement.completed ? "checked" : ""
    }>
                    <span class="list-text ${completed}">${list}</span>
                    <div class="dated">${date}</div>
                </div>
         <div id="tools">
         <button type="button" class="edit-text" onclick="editTodo(${i})"><i class="bi bi-pencil"></i></button>
         <button type="button" id="${i}" class="delBtn" onclick="handleDeleteClick(this)" data-index="${i}"><i class="bi bi-trash3"></i></button>
        </div>
        </li>
    `;
    todoHTML += html;
  }

  document.querySelector(".paragraph-pop").innerHTML = todoHTML;

  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("click", () => {
      todo[index].completed = checkbox.checked;
      saveTodo();
      renderTodo();
    });
  });
}
let currentIndex;
function showDeleteDialog(index) {
  // Show the modal
  currentIndex = index;
  modalDelete.showModal();
}

function handleDeleteClick(event) {
  modalDelete.showModal();
  const index = event.currentTarget.getAttribute("data-index");
  console.log(event);

  showDeleteDialog(index);
}

// Set up the confirm delete action
deleteAnItem.addEventListener("click", function () {
  alert("deleted...");
  todo.splice(currentIndex, 1);
  saveTodo();
  renderTodo();
  modalDelete.close();
});

cancelButton.addEventListener("click", () => {
  alert("canceled");
  modalDelete.close();
});

function loadTodo() {
  const storedTodo = localStorage.getItem("todo");
  if (storedTodo) {
    todo = JSON.parse(storedTodo);
    todo.forEach((todoElement) => {
      if (todoElement.completed) {
        todoElement.completed = true;
      } else {
        todoElement.completed = false;
      }
    });
    renderTodo();
  }
}

function saveTodo() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

confirmBtn.addEventListener("click", () => {
  todo = [];

  if (inputElement.value) {
    localStorage.removeItem("todo");
  }

  modal.close();

  saveTodo();
  renderTodo();
});

clearAllBtn.addEventListener("click", () => {
  modal.showModal();
});
cancelBtn.addEventListener("click", () => {
  modal.close();
});

loadTodo();
renderTodo();

function checked() {
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("click", function () {
      const textElement = textElements[index];
      const date = dateInputElement[index];
      console.log(`Checkbox clicked: ${checkbox.checked}`);
      if (checkbox.checked) {
        textElement.classList.add("strikethrough");
        date.classList.add("strikethrough");
      } else {
        textElement.classList.remove("strikethrough");
        date.classList.remove("strikethrough");
      }
      todo[index].completed = checkbox.checked;
      saveTodo();
    });
  });

  textElements.forEach((textElement, index) => {
    textElement.addEventListener("click", function () {
      const checkbox = checkboxes[index];

      checkbox.checked = checkbox.checked;

      if (checkbox.checked) {
        textElement.classList.add("strikethrough");
        dateInputElement[index].classList.add("strikethrough");
      } else {
        textElement.classList.remove("strikethrough");
        dateInputElement[index].classList.remove("strikethrough");
      }
      console.log(`Text clicked: ${checkbox.checked}`);

      todo[index].completed = checkbox.checked;
      saveTodo();
    });
  });
}

function editTodo(index) {
  editMode = true;
  const todoElement = todo[index];
  editIndex = index;

  renderTodo();

  textAreaElement.value = todoElement.list;

  dateInputElement.value = todoElement.date;

  localStorage.removeItem("todo");

  addBtn.innerHTML = "Update";
  document.getElementById(`item${editIndex}`).style.opacity = 0.5;
}

// function updateTodo(index) {
//   console.log(index);

//   const updateText = textAreaElement.value;
//   const updateDate = dateInputElement.value;

//   addBtn.innerHTML = "Update";

//   todo[index].list = updateText;
//   todo[index].date = updateDate;
//   localStorage.setItem("todo", JSON.stringify(todo));

//   todo.splice(index, 1);

//   addBtn.innerHTML = "Add Todo";
//   renderTodo(todo);
// }

// .value is used to get the item in the add card.i.e whatever the user inputs into the text area it displays and retrieves the content.

// clear all dialog button

document.body.addEventListener("keydown", (event) => {
  // console.log(event);

  if (event.key === "Enter") {
    // addTodo("addCard");
  } else if (event.key === "Delete") {
    deleteTodo("deleteItem");
  }
});

const select = document.querySelector("select");
const body = document.querySelector("body");
document.body.style.padding = "10px";

function update(bgColor, textColor) {
  body.style.backgroundColor = bgColor;
  // body.style.color = textColor;
}

select.addEventListener("change", () =>
  select.value === "black" ? update("black", "red") : update("red", "black")
);

// To display an array beneath when a text is added to a list we use a loop
// major parts of a loop, loop variable = let i = 1; loop condition = while (i <= 1){} or for(){} and increment step {i++ or i = i + 1}

// for loop for(i = 1; i <= 5; i++){}
// Accumulator pattern
// 1. Create a variable to store the result
// Loop throughout the array to update the result

// In creating website with Javascript first of you have to save the data
// Use the data to generate the html
// Make it interactive

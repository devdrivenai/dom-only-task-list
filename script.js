// refs to elems
// const newTaskForm = document.querySelector(".new-task-form");
// const newTaskText = document.querySelector(".new-task-text");
// const tasksSection = document.querySelector(".tasks");
import { newTaskForm, newTaskText, tasksSection } from "./modules/selectors.js";

// db-ish
const tasks = [];

window.onload = () => {
  if (!tasks.length) {
    const noTasksMessage = addGenericElem(
      tasksSection,
      "div",
      "No tasks yet! Is there anything you want to remember? Add it now!"
    );
    noTasksMessage.classList.add("no-tasks-msg");
  } else {
    // console.log('tasks loaded') // this will be useful later after persisting
  }

  addDefaultEvent("submit", newTaskForm, submitNewTaskHandler);
};

const addGenericElem = (appendTo, elemTag, text = "") => {
  const elem = document.createElement(elemTag);
  let textNode = document.createTextNode(text);
  if (textNode.length) {
    elem.appendChild(textNode);
  }
  return appendTo.appendChild(elem); // should return appended child
};

const addInputElement = (appendTo, textVal = '') => {
  const inputElem = addGenericElem(appendTo, 'input')
  inputElem.value = textVal
  // inputElem.setAttribute('disabled', true)
  return inputElem
}

const addDefaultEvent = (eventType, targetElem, handler) => {
  targetElem.addEventListener(eventType, (ev) => {
    handler(ev);
  });
};

const submitNewTaskHandler = (ev) => {
  ev.preventDefault();
  if (!newTaskText.value) return;
  const textVal = newTaskText.value;
  tasks.push[textVal];
  addNewTaskToDOM(textVal);
  newTaskText.value = "";
};

const addNewTaskToDOM = (taskTextInput) => {
  if (document.querySelector(".no-tasks-msg")) {
    document.querySelector(".no-tasks-msg").remove();
  }
  const newTaskDiv = addGenericElem(tasksSection, "div");
  newTaskDiv.classList.add("task-item");
  const taskTextWrapper = addGenericElem(newTaskDiv, 'div')
  taskTextWrapper.classList.add('task-text-wrapper')
  const newTask = addInputElement(taskTextWrapper, taskTextInput);
  newTask.setAttribute('disabled', true)
  const editConfirmBtn = addGenericElem(taskTextWrapper, 'button')
  // editConfirmBtn.classList.add("task-action-btn", 'edit-confirm-btn');
  editConfirmBtn.classList.add('edit-confirm-btn')
  const confirmIcon = addGenericElem(editConfirmBtn, 'img')
  confirmIcon.setAttribute('src', 'assets/confirm-coral.svg')

  const taskActionBtns = addGenericElem(newTaskDiv, 'div')
  taskActionBtns.classList.add('task-action-btns')

  const taskEditBtn = addGenericElem(taskActionBtns, 'button')
  taskEditBtn.classList.add("task-action-btn", 'task-edit-btn');
  taskEditBtn.addEventListener('click', editBtnHandler)
  const editIcon = addGenericElem(taskEditBtn, 'img')
  editIcon.setAttribute('src', 'assets/edit-coral.svg')

  const taskDeleteBtn = addGenericElem(taskActionBtns, 'button')
  taskDeleteBtn.classList.add("task-action-btn", 'task-delete-btn');
  const deleteIcon = addGenericElem(taskDeleteBtn, 'img')
  deleteIcon.setAttribute('src', 'assets/delete-coral.svg')

};

const makeEditable = (elem) => {
  elem.removeAttribute('disabled')
}

const makeUneditable = (elem) => {
  elem.setAttribute('disabled', true)
}

const editBtnHandler = (ev) => {
  const editBtn = ev.target
  console.log(`you just clicked: ${editBtn}`)
  const actionBtns = document.querySelectorAll('.task-action-btn')
  // const actionBtns = document.getElementsByClassName('task-action-btn')
  console.log(`actionBtns elems: ${actionBtns.length}`)
  for (let btn of actionBtns) {
    console.log(btn)
    btn.setAttribute('disabled', true)
  }
  const taskTextInput = editBtn.parentElement.previousElementSibling.firstElementChild
  const textToEdit = taskTextInput.value
  // console.log(`text to edit is ${textToEdit}`)

  taskTextInput.classList.add('editable-task')
  taskTextInput.setAttribute('data-text', textToEdit)
  makeEditable(taskTextInput)
  document.querySelector('.editable-task').focus()

  const confirmBtn = taskTextInput.nextElementSibling
  confirmBtn.classList.add('active')

}

const handleKeyPress = (ev) => {
  const keyPressed = ev.key
  // console.log(keyPressed)
  const editableTask = document.querySelector('.editable-task')
  if (!editableTask) {
    console.log('nothing to do... lets return')
    return
  }
  const confirmBtn = editableTask.nextElementSibling
  console.log('i didnt get here, or did I?')
  const editBtn = editableTask.parentElement.nextElementSibling.firstElementChild
  // console.log(editBtn)
  // editBtn.setAttribute('disabled', true)
  // disable all instead:

  if (keyPressed === 'Escape') {
    editableTask.value = editableTask.getAttribute('data-text')
    makeUneditable(editableTask)
    confirmBtn.classList.remove('active')
    editableTask.classList.remove('editable-task')
  } else if ( keyPressed === 'Enter') {
    ev.preventDefault()
    if (!editableTask.value) {
      editableTask.value = editableTask.getAttribute('data-text')
    }
    confirmBtn.classList.remove('active')
    makeUneditable(editableTask)
    editableTask.setAttribute('data-text', editableTask.value)
    editableTask.classList.remove('editable-task')    
  }
}  

document.addEventListener('keydown', handleKeyPress)
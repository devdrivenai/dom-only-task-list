import * as selectors from "./DOMSelectors.js";
import { addGenericElem, addInputElement } from "./utils.js";
import { persistTask } from "./tasks.js";
import { editBtnHandler, deleteBtnHandler } from "./task.js";

export const submitNewTaskHandler = (ev) => {
  ev.preventDefault();
  if (!selectors.newTaskText.value) return;
  const textVal = selectors.newTaskText.value;
  persistTask(textVal)
  addNewTaskToDOM(textVal);
  selectors.newTaskText.value = "";
};

const addNewTaskToDOM = (taskTextInput) => {
  if (document.querySelector(".no-tasks-msg")) {
    document.querySelector(".no-tasks-msg").remove();
  }
  const newTaskDiv = addGenericElem(selectors.tasksSection, "div");
  newTaskDiv.classList.add("task-item");
  const taskTextWrapper = addGenericElem(newTaskDiv, 'div')
  taskTextWrapper.classList.add('task-text-wrapper')
  const newTask = addInputElement(taskTextWrapper, taskTextInput);
  newTask.setAttribute('data-text', taskTextInput)
  newTask.setAttribute('disabled', true)
  const editConfirmBtn = addGenericElem(taskTextWrapper, 'button')
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
  taskDeleteBtn.addEventListener('click', deleteBtnHandler)
  const deleteIcon = addGenericElem(taskDeleteBtn, 'img')
  deleteIcon.setAttribute('src', 'assets/delete-coral.svg')

};
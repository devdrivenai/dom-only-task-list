import * as selectors from "./DOMSelectors.js";
import { addGenericElem } from "./utils.js";
import { persistTask } from "./tasks.js";
import { editBtnHandler, deleteBtnHandler, editConfirmBtnHandler } from "./task.js";

export const submitNewTaskHandler = (ev) => {
  ev.preventDefault();
  if (!selectors.newTaskText.value) return;
  const textVal = selectors.newTaskText.value;
  const taskId = persistTask(textVal)
  addNewTaskToDOM(textVal, taskId);
  selectors.newTaskText.value = "";
};

const addNewTaskToDOM = (taskTextInput, taskId) => {
  if (document.querySelector(".no-tasks-msg")) {
    document.querySelector(".no-tasks-msg").remove();
  }
  const newTaskDiv = addGenericElem(selectors.tasksSection, "div", {
    classes: ['task-item'],
    attribs: {dataset: {taskid: taskId}}
  });
  const taskTextWrapper = addGenericElem(newTaskDiv, 'div', {classes: ['task-text-wrapper']})
  // newTask
  addGenericElem(taskTextWrapper, 'input', {
    attribs: {
      disabled: true,
      value: taskTextInput
    }
  })
  const editConfirmBtn = addGenericElem(taskTextWrapper, 'button', {
    classes: ['edit-confirm-btn'],
    eventListeners: {click: editConfirmBtnHandler}
  })
  // confirmIcon
  addGenericElem(editConfirmBtn, 'img', {attribs: {src: 'assets/confirm-coral.svg'}})
  
  const taskActionBtns = addGenericElem(newTaskDiv, 'div', {classes: ['task-action-btns']})

  const taskEditBtn = addGenericElem(taskActionBtns, 'button', {
    classes: ['task-action-btn', 'task-edit-btn'],
    eventListeners: {click: editBtnHandler},
  })
  // editIcon
  addGenericElem(taskEditBtn, 'img', {attribs: {src: 'assets/edit-coral.svg'}})

  const taskDeleteBtn = addGenericElem(taskActionBtns, 'button', {
    classes: ['task-action-btn', 'task-delete-btn'],
    eventListeners: {click: deleteBtnHandler}
  })
  // deleteIcon
  addGenericElem(taskDeleteBtn, 'img', {attribs: {src: 'assets/delete-coral.svg'}})
};
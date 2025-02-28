import { editConfirmBtnHandler, editBtnHandler, deleteBtnHandler } from "./task.js";
import { addGenericElem, addMaskedIcon, getElement } from "./utils.js";

export const addNewTaskToDOM = (taskTextInput: string, taskId: number) => {
  if (!taskTextInput) {
    throw new Error("The text of the task can't be empty.");
  }
  if (typeof taskId !== 'number' || !Number.isInteger(taskId)) {
    throw new Error("The task id has to be an integer.");
  }
  document.querySelector(".no-tasks-msg")?.remove()
  const taskIdString = taskId.toString()
  const tasksSection = getElement<HTMLElement>('.tasks')
  const newTaskDiv = addGenericElem(tasksSection, "div", {
    classes: ['task-item'],
    attribs: {dataset: {taskid: taskIdString}}
  });
  const taskTextWrapper = addGenericElem(newTaskDiv, 'div', {classes: ['task-text-wrapper']})
  // newTask
  addGenericElem(taskTextWrapper, 'input', {
    attribs: {
      disabled: true,
      value: taskTextInput,
      dataset: {
        taskid: taskIdString
      }
    }
  })
  const editConfirmBtn = addGenericElem(taskTextWrapper, 'button', {
    classes: ['edit-confirm-btn'],
    eventListeners: {click: () => editConfirmBtnHandler(taskIdString)},
    attribs: {dataset: {taskid: taskIdString}}
  })
  // confirmIcon
  addMaskedIcon(editConfirmBtn, 'assets/confirm-icon.svg')
  
  const taskActionBtns = addGenericElem(newTaskDiv, 'div', {classes: ['task-action-btns']})

  const taskEditBtn = addGenericElem(taskActionBtns, 'button', {
    classes: ['task-action-btn', 'task-edit-btn'],
    eventListeners: {click: () => editBtnHandler(taskIdString)}
  })
  // editIcon
  addMaskedIcon(taskEditBtn, 'assets/edit-icon.svg')

  const taskDeleteBtn = addGenericElem(taskActionBtns, 'button', {
    classes: ['task-action-btn', 'task-delete-btn'],
    eventListeners: {click: () => deleteBtnHandler(taskIdString)}
  })
  // deleteIcon
  addMaskedIcon(taskDeleteBtn, 'assets/delete-icon.svg')
};
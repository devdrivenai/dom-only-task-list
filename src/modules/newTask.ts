import { newTaskText, tasksSection } from "./DOMSelectors.js";
import { addGenericElem } from "./utils.js";
import { persistTask } from "./tasks.js";
import { editBtnHandler, deleteBtnHandler, editConfirmBtnHandler } from "./task.js";

export const submitNewTaskHandler = (ev: Event) => {
  ev.preventDefault();
  if (newTaskText) {
    if (!newTaskText.value) return

    const taskId = persistTask(newTaskText.value)
    addNewTaskToDOM(newTaskText.value, taskId)
    newTaskText.value = ''
  }
  // else log warning
};

const addNewTaskToDOM = (taskTextInput: string, taskId: number) => {
  document.querySelector(".no-tasks-msg")?.remove()
  if (tasksSection) {
    const newTaskDiv = addGenericElem(tasksSection, "div", {
      classes: ['task-item'],
      attribs: {dataset: {taskid: taskId.toString()}}
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
  }
  // else log warning

};
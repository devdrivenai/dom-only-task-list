import { addGenericElem, addMaskedIcon, getElement, toggleEditability } from "./utils.js"
import { loadNoTaskMsg, selectFormAndBtns } from "./task.js"
import { deleteTask } from "./tasks.js"

const createOverlayBg = () => {
  const overlayBg = addGenericElem(document.body, 'div', {classes: ['overlay-bg']})
  document.body.style.overflow = 'hidden'
  return overlayBg  
}

export const confirmDeleteBox = (task: string, taskId: number) => {
  const confirmDeleteBox = addGenericElem(createOverlayBg(), 'div', {classes: ['confirm-delete-box']})
  // confirmMsg:
  addGenericElem(confirmDeleteBox, 'p', {text: 'Are you sure you want to delete this task:'})
  // taskText
  addGenericElem(confirmDeleteBox, 'p', {text: task, classes: ['task-text']})
  
  const deleteBtns = addGenericElem(confirmDeleteBox, 'div')

  const deleteBtn = addGenericElem(deleteBtns, 'button', {
    classes: ['task-action-btn', 'confirm-delete-btn'], 
    eventListeners: {click: () => {confirmDeleteHandler(taskId)}}
  })
  // deleteIcon
  addMaskedIcon(deleteBtn, 'assets/delete-icon.svg')

  const cancelBtn = addGenericElem(deleteBtns, 'button', {
    classes: ['task-action-btn', 'cancel-delete-btn'],
    eventListeners: {click: cancelDeleteHandler}
  })
  // cancelIcon
  addMaskedIcon(cancelBtn, 'assets/cancel-icon.svg')
  return confirmDeleteBox  
}

const cancelDeleteHandler = () => {
  const task = getElement('#deletable-task')
  if (task) {
    task.removeAttribute('id')
  }
  // else log warning
  const overlayBg = getElement('.overlay-bg')
  if (overlayBg) {
    overlayBg.remove()
  }
  // else log warning
  toggleEditability(selectFormAndBtns())
}

const confirmDeleteHandler = (taskId: number) => {
  const task = getElement('#deletable-task')
  if (task) {
    task.remove()
  }
  // else log warning
  const overlayBg = getElement('.overlay-bg')
  if (overlayBg) {
    overlayBg.remove()
  }
  // else log warning
  deleteTask(taskId)
  const tasks = getElement('.tasks')
  if (tasks) {
    if (!tasks.childElementCount) loadNoTaskMsg
  }
  // does this one need a warning, too?
  toggleEditability(selectFormAndBtns())
}
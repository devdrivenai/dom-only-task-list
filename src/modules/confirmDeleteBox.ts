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
  task.removeAttribute('id')
  const overlayBg = getElement('.overlay-bg')
  overlayBg.remove()
  toggleEditability(selectFormAndBtns())
}

const confirmDeleteHandler = (taskId: number) => {
  const task = getElement('#deletable-task')
  task.remove()
  const overlayBg = getElement('.overlay-bg')
  overlayBg.remove()
  deleteTask(taskId)
  const tasks = getElement('.tasks')
  if (!tasks.childElementCount) loadNoTaskMsg
  toggleEditability(selectFormAndBtns())
}
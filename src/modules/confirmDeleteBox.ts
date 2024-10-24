import { addGenericElem, getElement } from "./utils.js"
import { exitDeleteMode, loadNoTaskMsg } from "./task.js"
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
  addGenericElem(deleteBtn, 'img', {attribs: {src: 'assets/delete-coral.svg'}})
  const cancelBtn = addGenericElem(deleteBtns, 'button', {
    classes: ['task-action-btn', 'cancel-delete-btn'],
    eventListeners: {click: cancelDeleteHandler}
  })
  // cancelIcon
  addGenericElem(cancelBtn, 'img', {attribs: {src: 'assets/cancel-coral.svg'}})
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
  exitDeleteMode()
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
  exitDeleteMode()
}
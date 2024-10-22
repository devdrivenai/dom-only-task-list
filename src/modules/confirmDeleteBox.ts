import { addGenericElem } from "./utils.js"
import { exitDeleteMode, loadNoTaskMsg } from "./task.js"
import { deleteTask } from "./tasks.js"

const createOverlayBg = () => {
  const overlayBg = addGenericElem(document.body, 'div', {classes: ['overlay-bg']})
  document.body.style.overflow = 'hidden'
  return overlayBg  
}

export const confirmDeleteBox = (task, taskId) => {
  const confirmDeleteBox = addGenericElem(createOverlayBg(), 'div', {classes: ['confirm-delete-box']})
  // confirmMsg:
  addGenericElem(confirmDeleteBox, 'p', {text: 'Are you sure you want to delete this task:'})
  // taskText
  addGenericElem(confirmDeleteBox, 'p', task)
  const deleteBtns = addGenericElem(confirmDeleteBox, 'div')
  const deleteBtn = addGenericElem(deleteBtns, 'button', {
    classes: ['task-action-btn', 'confirm-delete-btn'], 
    eventListeners: {click: (ev, taskId) => confirmDeleteHandler(ev, taskId)}
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
  document.querySelector('#deletable-task').removeAttribute('id')
  document.querySelector('.overlay-bg').remove()
  exitDeleteMode()
}

const confirmDeleteHandler = (ev, taskId) => {
  document.querySelector('#deletable-task').remove()
  document.querySelector('.overlay-bg').remove()
  deleteTask(taskId)
  if (!document.querySelector('.tasks').childElementCount) loadNoTaskMsg()
  exitDeleteMode()
}
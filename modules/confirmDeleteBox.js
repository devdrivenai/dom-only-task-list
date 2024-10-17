import { addGenericElem } from "./utils.js"
import { exitDeleteMode } from "./task.js"

const createOverlayBg = () => {
  const overlayBg = addGenericElem(document.body, 'div')
  overlayBg.classList.add('overlay-bg')
  document.body.style.overflow = 'hidden'
  return overlayBg  
}

export const confirmDeleteBox = (task) => {
  const confirmDeleteBox = addGenericElem(createOverlayBg(), 'div')
  confirmDeleteBox.classList.add('confirm-delete-box')
  const confirmMsg = addGenericElem(confirmDeleteBox, 'p', 'Are you sure you want to delete this task:')
  const taskText = addGenericElem(confirmDeleteBox, 'p', task)
  const deleteBtns = addGenericElem(confirmDeleteBox, 'div')
  const deleteBtn = addGenericElem(deleteBtns, 'button')
  deleteBtn.classList.add("task-action-btn", 'confirm-delete-btn');
  deleteBtn.addEventListener('click', confirmDeleteHandler)
  const deleteIcon = addGenericElem(deleteBtn, 'img')
  deleteIcon.setAttribute('src', 'assets/delete-coral.svg')
  const cancelBtn = addGenericElem(deleteBtns, 'button')
  cancelBtn.classList.add("task-action-btn", 'cancel-delete-btn');
  cancelBtn.addEventListener('click', cancelDeleteHandler)
  const cancelIcon = addGenericElem(cancelBtn, 'img')
  cancelIcon.setAttribute('src', 'assets/cancel-coral.svg')
  return confirmDeleteBox  
}

const cancelDeleteHandler = () => {
  document.querySelector('#deletable-task').removeAttribute('id')
  document.querySelector('.overlay-bg').remove()
  exitDeleteMode()
}

const confirmDeleteHandler = () => {
  document.querySelector('#deletable-task').remove()
  document.querySelector('.overlay-bg').remove()
  exitDeleteMode()
}
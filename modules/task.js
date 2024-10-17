import { allFormChildren } from "./DOMSelectors.js"
import { toggleEditability } from "./utils.js"
import { toggleId } from "./utils.js"
import { confirmDeleteBox as createConfirmBox } from "./confirmDeleteBox.js"

export const toggleFormAndBtns = () => {
  // task-action-btns are dynamic
  toggleEditability([...document.querySelectorAll('.task-action-btn'), ...allFormChildren])
}

export const toggleEditMode = (inputField, textEdit = '') => {
  const confirmBtn = inputField.nextElementSibling
  confirmBtn.classList.toggle('active')
  if (!textEdit) {
    inputField.value = inputField.getAttribute('data-text')
  } else {
    inputField.setAttribute('data-text', textEdit)
  }
  toggleEditability(inputField)
  toggleFormAndBtns()
  toggleId('editable-task', inputField)
  inputField.focus()
}

export const editBtnHandler = (ev) => {
  const editBtn = ev.target
  // selector specific to the task's event
  const taskTextInput = editBtn.parentElement.previousElementSibling.firstElementChild
  toggleEditMode(taskTextInput)
}

export const enterDeleteMode = (task) => {
  createConfirmBox(task)
}

export const exitDeleteMode = () => {
  toggleFormAndBtns()
}

export const deleteBtnHandler = (ev) => {
  toggleFormAndBtns()
  const deleteBtn = ev.target
  // selectors specific to the task's event
  const taskItem = deleteBtn.parentElement.parentElement
  const taskText = deleteBtn.parentElement.previousElementSibling.firstElementChild.value
  taskItem.setAttribute('id', 'deletable-task')
  enterDeleteMode(taskText)
}
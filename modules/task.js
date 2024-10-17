import { allFormChildren } from "./DOMSelectors.js"
import { toggleEditability } from "./utils.js"

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
  if (inputField.classList.contains('editable-task')) {
    inputField.classList.remove('editable-task')
  } else {
    inputField.classList.add('editable-task')
    inputField.focus()
  }
}

export const editBtnHandler = (ev) => {
  const editBtn = ev.target
  // selector specific to the task's event
  const taskTextInput = editBtn.parentElement.previousElementSibling.firstElementChild
  toggleEditMode(taskTextInput)
}
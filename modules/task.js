import { allFormChildren } from "./DOMSelectors.js"
import { toggleEditability } from "./utils.js"

const toggleFormAndBtns = () => {
  // task-action-btns are dynamic
  toggleEditability([...document.querySelectorAll('.task-action-btn'), ...allFormChildren])
}

export const editBtnHandler = (ev) => {
  const editBtn = ev.target
  // selectors specific to the task's event
  const taskTextInput = editBtn.parentElement.previousElementSibling.firstElementChild
  const textToEdit = taskTextInput.value
  taskTextInput.classList.add('editable-task')
  taskTextInput.setAttribute('data-text', textToEdit)
  toggleEditability(taskTextInput)
  toggleFormAndBtns()
  document.querySelector('.editable-task').focus()
  const confirmBtn = taskTextInput.nextElementSibling
  confirmBtn.classList.add('active')
}
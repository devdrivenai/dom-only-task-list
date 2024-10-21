import { allFormChildren, tasksSection } from "./DOMSelectors.js"
import { addGenericElem, toggleEditability, toggleId, focusInput } from "./utils.js"
import { confirmDeleteBox as createConfirmBox } from "./confirmDeleteBox.js"

export const toggleFormAndBtns = () => {
  // task-action-btns are dynamic
  toggleEditability([...document.querySelectorAll('.task-action-btn'), ...allFormChildren])
}

export const toggleEditMode = (inputField, textEdit = '') => {
  if (!textEdit) {
    inputField.value = inputField.defaultValue
  } else if (textEdit === inputField.defaultValue) {
    return
  } else {
    inputField.defaultValue = inputField.value
  }
  const confirmBtn = inputField.nextElementSibling
  confirmBtn.classList.toggle('active')
  toggleEditability(inputField)
  toggleFormAndBtns()
  toggleId('editable-task', inputField)
  focusInput(inputField)
}

export const editConfirmBtnHandler = (ev) => {
  const editConfirmBtn = ev.target
  const inputField = editConfirmBtn.previousElementSibling
  if (inputField.value === inputField.defaultValue) {
    focusInput(inputField)
    return
  }
  toggleEditMode(inputField, inputField.value)
}

export const editBtnHandler = (ev) => {
  const editBtn = ev.target
  // selector specific to the task's event
  const taskTextInput = editBtn.parentElement.previousElementSibling.firstElementChild
  toggleEditMode(taskTextInput)
}

export const enterDeleteMode = (task, taskId) => {
  createConfirmBox(task, taskId)
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
  const taskId = taskItem.dataset.taskid
  enterDeleteMode(taskText, taskId)
}

export const loadNoTaskMsg = () => {
  // noTaskMsg
  addGenericElem(
    tasksSection,
    "div",
    {
      classes: ['no-tasks-msg'], 
      text: 'No tasks yet! Is there anything you want to remember? Add it now!'
    }
  ); 
}
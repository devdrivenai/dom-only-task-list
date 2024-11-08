import { addGenericElem, isHTMLElement, toggleEditability, toggleId, focusInput, getElement } from "./utils.js"
import { confirmDeleteBox as createConfirmBox } from "./confirmDeleteBox.js"

export const selectFormAndBtns = () => {
  // task-action-btns are dynamic
  const taskActionBtns = [...document.querySelectorAll('.task-action-btn')].filter(isHTMLElement)
  const newTaskForm = getElement<HTMLFormElement>(".new-task-form")
  const allFormChildren: HTMLElement[] = Array.from(newTaskForm.children) as HTMLElement[]
  return [...taskActionBtns, ...allFormChildren]
}

export const toggleEditMode = (
  inputField : HTMLInputElement, skip = false
) => {
  if (!inputField.value || skip) {
    inputField.value = inputField.defaultValue
  } else if (inputField.value === inputField.defaultValue) {
    return
  } else {
    inputField.defaultValue = inputField.value
  }
  const taskId = inputField.dataset.taskid
  const confirmBtn = getElement(`.edit-confirm-btn[data-taskid="${taskId}"]`)
  confirmBtn.classList.toggle('active')
  toggleEditability(inputField)
  toggleEditability(selectFormAndBtns())
  toggleId('editable-task', inputField)
  focusInput(inputField)
}

export const editConfirmBtnHandler = (taskId: string) => {
  const inputField = getElement(`input[data-taskid="${taskId}"]`) as HTMLInputElement

  if(inputField.getAttribute('id') !== 'editable-task') {
    throw new Error("There is no input with id editable-task here.");
  }

  if (inputField.value === inputField.defaultValue) {
    focusInput(inputField)
    return
  }

  // need to update task (in tasks) from here!
  
  toggleEditMode(inputField)
}

export const editBtnHandler = (taskId: string) => {
  if (taskId === '') {
    throw new Error("The arg passed should be the task id (str) but is an empty string.");
  }
  if (!Number.isInteger(parseInt(taskId))) {
    throw new Error("This taskId can\'t be converted to an integer.");
  }
  const taskTextInput = getElement(`input[data-taskid="${taskId}"]`) as HTMLInputElement
  toggleEditMode(taskTextInput, true)
}

export const deleteBtnHandler = (taskId: string) => {
  const taskItem = getElement(`.task-item[data-taskid="${taskId}"]`)
  const taskInputField = getElement(`input[data-taskid="${taskId}"]`) as HTMLInputElement
  const taskText = taskInputField.value
  taskItem.setAttribute('id', 'deletable-task')
  toggleEditability(selectFormAndBtns())
  createConfirmBox(taskText, parseInt(taskId))
}

export const loadNoTaskMsg = () => {
  const tasksSection = getElement<HTMLElement>('.tasks')
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
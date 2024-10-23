import { allFormChildren, tasksSection } from "./DOMSelectors.js"
import { addGenericElem, isHTMLElement, toggleEditability, toggleId, focusInput } from "./utils.js"
import { confirmDeleteBox as createConfirmBox } from "./confirmDeleteBox.js"

export const toggleFormAndBtns = () => {
  // task-action-btns are dynamic
  const taskActionBtns = [...document.querySelectorAll('.task-action-btn')].filter(isHTMLElement)
  toggleEditability([...taskActionBtns, ...allFormChildren])
}

export const toggleEditMode = (inputField: HTMLInputElement, textEdit = '') => {
  if (!textEdit) {
    inputField.value = inputField.defaultValue
  } else if (textEdit === inputField.defaultValue) {
    return
  } else {
    inputField.defaultValue = inputField.value
  }
  const confirmBtn = inputField.nextElementSibling
  confirmBtn?.classList.toggle('active')
  toggleEditability(inputField)
  toggleFormAndBtns()
  toggleId('editable-task', inputField)
  focusInput(inputField)
}

export const editConfirmBtnHandler = (ev: Event) => {
  const editConfirmBtn = ev.target as HTMLElement
  const inputField = editConfirmBtn.previousElementSibling
  // in case markup changes in future:
  if (inputField && inputField instanceof HTMLInputElement) {
    if (inputField.value === inputField.defaultValue) {
      focusInput(inputField)
      return
    }
    toggleEditMode(inputField, inputField.value)
  }
  // else logging warning?
}

export const editBtnHandler = (ev: Event) => {
  const editBtn = ev.target as HTMLElement
  // selector specific to the task's event
  const taskTextInput = editBtn.parentElement?.previousElementSibling?.firstElementChild as HTMLInputElement
  toggleEditMode(taskTextInput)
}

const enterDeleteMode = (task: string, taskId: number) => {
  createConfirmBox(task, taskId)
}

export const exitDeleteMode = () => {
  toggleFormAndBtns()
}

export const deleteBtnHandler = (ev: Event) => {
  toggleFormAndBtns()
  const deleteBtn = ev.target as HTMLElement
  // selectors specific to the task's event
  const taskItem = deleteBtn.parentElement?.parentElement
  const taskInputField = deleteBtn.parentElement?.previousElementSibling?.firstElementChild as HTMLInputElement
  if (taskInputField) {
    const taskText = taskInputField.value
    if (taskItem) {
      taskItem.setAttribute('id', 'deletable-task')
      const taskId = taskItem.dataset.taskid
      if (taskId) {
        enterDeleteMode(taskText, parseInt(taskId))
      }
      // else log warning
    }
    // else log warning
  }
  // else log warning
}

export const loadNoTaskMsg = () => {
  if (tasksSection && tasksSection instanceof HTMLElement) {
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
  // else log warning?
}
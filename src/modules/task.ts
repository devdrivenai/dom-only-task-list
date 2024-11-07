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
  const confirmBtn = inputField.nextElementSibling
  if (!(confirmBtn instanceof HTMLElement) || 
      !confirmBtn.classList.contains('edit-confirm-btn')
    ) {
      throw new Error("Couldn\'t find a button with edit-confirm-btn class.");
    }
  confirmBtn.classList.toggle('active')
  toggleEditability(inputField)
  toggleEditability(selectFormAndBtns())
  toggleId('editable-task', inputField)
  focusInput(inputField)
}

export const editConfirmBtnHandler = (ev: Event) => {
  const editConfirmBtn = ev.target as HTMLElement
  const inputField = editConfirmBtn?.previousElementSibling as HTMLInputElement

  if(!inputField || inputField.getAttribute('id') !== 'editable-task') {
    throw new Error("There is no input with id editable-task here.");
  }

  if (inputField.value === inputField.defaultValue) {
    focusInput(inputField)
    return
  }

  // need to update task here!
  
  toggleEditMode(inputField)
}

export const editBtnHandler = (ev: Event) => {
  const editBtn = ev.target as HTMLElement
  // selector specific to the task's event
  const taskTextInput = editBtn?.parentElement?.previousElementSibling?.firstElementChild as HTMLInputElement

  if (!taskTextInput || !(taskTextInput instanceof HTMLInputElement)) {
    throw new Error("No input field to edit here. (Either you selected no element or the element is not an input.)");
  }
  toggleEditMode(taskTextInput, true)
}

export const deleteBtnHandler = (ev: Event) => {
  toggleEditability(selectFormAndBtns())
  const deleteBtn = ev.target as HTMLElement
  // selectors specific to the task's event
  const taskItem = deleteBtn?.parentElement?.parentElement as HTMLElement
  if (!taskItem || !(taskItem instanceof HTMLDivElement)) {
    throw new Error("That task doesn\'t exist. There is no task-item div here.");
  }
  const taskInputField = deleteBtn?.parentElement?.previousElementSibling?.firstElementChild as HTMLInputElement
  if (!taskInputField || !(taskInputField instanceof HTMLInputElement)) {
    throw new Error("There is no task input to delete here.");
  }
  if (taskInputField) {
    const taskText = taskInputField.value
    if (taskItem) {
      taskItem.setAttribute('id', 'deletable-task')
      const taskId = taskItem.dataset.taskid
      if (taskId) {
        createConfirmBox(taskText, parseInt(taskId))
      }
      // else log warning
    }
    // else log warning
  }
  // else log warning
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
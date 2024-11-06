import { submitNewTaskHandler } from "./modules/submitNewTaskHandler.js";
import { tasksPersisted } from "./modules/tasks.js";
import { toggleEditMode, loadNoTaskMsg } from "./modules/task.js";
import { getElement } from "./modules/utils.js";

window.onload = () => {
  if (!tasksPersisted()) {
    loadNoTaskMsg()
  } else {
    // console.log('tasks loaded') // this will be useful later after persisting
  }
  const newTask = getElement<HTMLFormElement>(".new-task-form")
  const newTaskText = getElement<HTMLTextAreaElement>(".new-task-text")
  newTask.addEventListener("submit", (ev) => {submitNewTaskHandler(ev, newTaskText)});

  document.addEventListener('keydown', handleKeyPress)
};

const handleKeyPress = (ev: KeyboardEvent) => {
  const keyPressed = ev.key

  const editableTask: HTMLInputElement | null = document.querySelector('#editable-task')
  if (!editableTask) {
    if (keyPressed === 'Enter') {
      const newTaskText = getElement<HTMLTextAreaElement>(".new-task-text")
      submitNewTaskHandler(ev, newTaskText)
    }
    return
  }

  if (keyPressed !== 'Escape' && keyPressed !== 'Enter') {
    return
  } else if (keyPressed === 'Escape') {
    toggleEditMode(editableTask)
  } else if (keyPressed === 'Enter') {
    ev.preventDefault()
    toggleEditMode(editableTask, editableTask.value)
  }
}  


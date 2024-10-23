import * as selectors from "./modules/DOMSelectors.js"
import { submitNewTaskHandler } from "./modules/newTask.js";
import { tasksPersisted } from "./modules/tasks.js";
import { toggleEditMode, loadNoTaskMsg } from "./modules/task.js";

window.onload = () => {
  if (!tasksPersisted) {
    loadNoTaskMsg()
  } else {
    console.log(tasksPersisted)
    // console.log('tasks loaded') // this will be useful later after persisting
  }
  const newTask = selectors.newTaskForm as HTMLElement
  newTask.addEventListener("submit", submitNewTaskHandler);

  document.addEventListener('keydown', handleKeyPress)
};

const handleKeyPress = (ev: KeyboardEvent) => {
  const keyPressed = ev.key

  const editableTask: HTMLInputElement | null = document.querySelector('#editable-task')
  if (!editableTask) {
    if (keyPressed === 'Enter') {
      submitNewTaskHandler(ev)
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


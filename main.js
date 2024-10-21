import * as selectors from "./modules/DOMSelectors.js"
import { submitNewTaskHandler } from "./modules/newTask.js";
import { tasksPersisted } from "./modules/tasks.js";
import { toggleEditMode, loadNoTaskMsg } from "./modules/task.js";

window.onload = () => {
  if (!tasksPersisted) {
    loadNoTaskMsg()
  } else {
    console.log(tasks.length)
    // console.log('tasks loaded') // this will be useful later after persisting
  }

  selectors.newTaskForm.addEventListener("submit", submitNewTaskHandler);

  document.addEventListener('keydown', handleKeyPress)
};

const handleKeyPress = (ev) => {
  const editableTask = document.querySelector('#editable-task')
  if (!editableTask) {
    // console.log('nothing to do... lets return')
    return
  }

  const keyPressed = ev.key
  // console.log(keyPressed)
  if (keyPressed !== 'Escape' && keyPressed !== 'Enter') {
    return
  } else if (keyPressed === 'Escape') {
    toggleEditMode(editableTask)
  } else if (keyPressed === 'Enter') {
    ev.preventDefault()
    toggleEditMode(editableTask, editableTask.value) 
  }
}  


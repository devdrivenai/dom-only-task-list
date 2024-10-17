import * as selectors from "./modules/DOMSelectors.js"
import { addGenericElem, addDefaultEvent } from "./modules/utils.js";
import { submitNewTaskHandler } from "./modules/newTask.js";
import { tasksPersisted } from "./modules/tasks.js";
import { toggleEditMode } from "./modules/task.js";

window.onload = () => {
  if (!tasksPersisted) {
    const noTasksMessage = addGenericElem(
      selectors.tasksSection,
      "div",
      "No tasks yet! Is there anything you want to remember? Add it now!"
    );
    noTasksMessage.classList.add("no-tasks-msg");
  } else {
    // console.log('tasks loaded') // this will be useful later after persisting
  }

  addDefaultEvent("submit", selectors.newTaskForm, submitNewTaskHandler);

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


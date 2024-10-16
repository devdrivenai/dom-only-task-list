import * as selectors from "./modules/DOMSelectors.js"
import { addGenericElem, addDefaultEvent } from "./modules/utils.js";
import { submitNewTaskHandler } from "./modules/newTask.js";
import { tasksPersisted } from "./modules/tasks.js";
import { makeUneditable } from "./modules/task.js";

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
  const keyPressed = ev.key
  // console.log(keyPressed)
  const editableTask = document.querySelector('.editable-task')
  if (!editableTask) {
    console.log('nothing to do... lets return')
    return
  }
  const confirmBtn = editableTask.nextElementSibling
  console.log('i didnt get here, or did I?')
  const editBtn = editableTask.parentElement.nextElementSibling.firstElementChild

  if (keyPressed === 'Escape') {
    editableTask.value = editableTask.getAttribute('data-text')
    makeUneditable(editableTask)
    confirmBtn.classList.remove('active')
    editableTask.classList.remove('editable-task')
  } else if ( keyPressed === 'Enter') {
    ev.preventDefault()
    if (!editableTask.value) {
      editableTask.value = editableTask.getAttribute('data-text')
    }
    confirmBtn.classList.remove('active')
    makeUneditable(editableTask)
    editableTask.setAttribute('data-text', editableTask.value)
    editableTask.classList.remove('editable-task')    
  }
}  


import { persistTask } from "./tasks.js";
import { addNewTaskToDOM } from "addNewTaskToDOM.js";

export const submitNewTaskHandler = (
  ev: Event,
  newTaskText: HTMLTextAreaElement | null
) => {
  ev.preventDefault();
  if (newTaskText) {
    if (!newTaskText.value) return

    const taskId = persistTask(newTaskText.value)
    addNewTaskToDOM(newTaskText.value, taskId)
    newTaskText.value = ''
  }
  // else log warning
};
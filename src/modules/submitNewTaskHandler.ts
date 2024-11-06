import { persistTask } from "./tasks.js";
import { addNewTaskToDOM } from "./addNewTaskToDOM.js";

export const submitNewTaskHandler = (
  ev: Event,
  newTaskText: HTMLTextAreaElement
) => {
  ev.preventDefault();

  if (!newTaskText.value) return

  const taskId = persistTask(newTaskText.value)
  addNewTaskToDOM(newTaskText.value, taskId)
  newTaskText.value = ''
};
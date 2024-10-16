// db-ish
const tasks = [];

export const persistTask = (taskText) => {
  tasks.push(taskText)
}

export const tasksPersisted = tasks.length
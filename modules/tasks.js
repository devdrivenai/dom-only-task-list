// db-ish
let tasks = [];

// in localstorage or db, we'd handle this with uuids
// and in a backendish way, cause its visible in fe
// but for this minimal scope, this is fine
let lastId = 0

export const persistTask = (taskText) => {
  const newTask = {
    taskText,
    taskId: lastId + 1
  }
  tasks.push(newTask)
  lastId++
  return newTask.taskId
}

export const deleteTask = (taskId) => {
  tasks = tasks.filter(task => task.taskId !== parseInt(taskId))
}

export const tasksPersisted = tasks.length
interface task {
  taskText: string,
  taskId: number
}

// db-ish
let tasks: task[] = [];

// in localstorage or db, we'd handle this with uuids
// and in a backendish way, cause its visible in fe
// but for this minimal scope, this is fine
let lastId = 0

export const persistTask = (taskText: string): number => {
  const newTask = {
    taskText,
    taskId: lastId + 1
  }
  tasks.push(newTask)
  lastId++
  return newTask.taskId
}

export const deleteTask = (taskId: number) => {
  tasks = tasks.filter(task => task.taskId !== taskId)
}

export const tasksPersisted = tasks.length
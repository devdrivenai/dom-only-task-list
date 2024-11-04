interface Task {
  taskText: string,
  taskId: number
}

// db-ish
let tasks: Task[] = [];

// in localstorage or db, we'd handle this with uuids
// and in a backendish way, cause its visible in fe
// but for this minimal scope, this is fine
let lastId = 0

export const persistTask = (taskText: string): number => {
  if (!taskText.length) {
    throw new Error("taskText can't be an empty string.");
  }
  const newTask = {
    taskText,
    taskId: ++lastId
  }
  tasks.push(newTask)
  return newTask.taskId
}

export const getTask = (taskId: number) => {
  if (!Number.isInteger(taskId)) {
    throw new Error("taskId has to be an integer.");  
  }

  const foundTask = tasks.find(task => task.taskId === taskId)
  if (!foundTask) {
    throw new Error("That task does not exist.");
  }
  return foundTask
}

export const deleteTask = (taskId: number) => {
  if (!Number.isInteger(taskId)) {
    throw new Error("taskId has to be an integer.");  
  }
  tasks = tasks.filter(task => task.taskId !== taskId)
}

export const tasksPersisted = () => tasks.length

export const getTasks = () => ([...tasks])

export const resetTasks = () => {
  tasks = []
  lastId = 0
}
import { deleteTask, getTask, getTasks, persistTask, resetTasks, tasksPersisted } from 'tasks'

let initialTasks : number

beforeEach(() => {
  resetTasks()
  initialTasks = tasksPersisted()
})

afterAll(() => {
  resetTasks()
})

describe('persistTask', () => {
  it('should persist multiple tasks & add right ID', () => {
    const task1 = 'Task 1'
    const task2 = 'Task 2'
    const task3 = 'Task 3'

    const id1 = persistTask(task1)
    expect(tasksPersisted()).toBe(initialTasks + 1)
    expect(id1).toBe(1)

    const id2 = persistTask(task2)
    expect(tasksPersisted()).toBe(initialTasks + 2)
    expect(id2).toBe(id1 + 1)

    const id3 = persistTask(task3)
    expect(id3).toBe(id2 + 1)
    expect(tasksPersisted()).toBe(initialTasks + 3)
  })

  it('should throw if passed an empty string', () => {
    expect(() => {
      persistTask('')
    }).toThrow()
  })
})

describe('deleteTask', () => {
  it('should delete any item', () => {
    persistTask('Task 1')
    const id2 = persistTask('Task 2')
    persistTask('Task 3')

    deleteTask(id2)
    
    expect(tasksPersisted()).toBe(initialTasks + 2)
    const updatedTasks = getTasks()
    expect(updatedTasks[0].taskId).toBe(initialTasks + 1)
    expect(updatedTasks[1].taskId).toBe(initialTasks + 3)
  })

  it('should handle gracefully if item was already deleted', () => {
    const id1 = persistTask('Task 1')
    persistTask('Task 2')

    deleteTask(id1)
    expect(() => {
      deleteTask(id1)
    }).not.toThrow()
    deleteTask(id1)
    expect(tasksPersisted()).toBe(initialTasks + 1)
  })

  it('should handle gracefully high id that doesn\'t exist', () => {
    persistTask('Task 1')
    persistTask('Task 2')

    
    expect(() => {
      deleteTask(1500)
    }).not.toThrow()
    deleteTask(1500)
    expect(tasksPersisted()).toBe(initialTasks + 2)
  })

  it('should throw if passed a non-integer number', () => {
    expect(() => {
      deleteTask(25.5)
    }).toThrow()
  })
})

describe('tasksPersisted', () => {
  it('should return an integer', () => {
    expect(typeof tasksPersisted()).toBe('number')
    expect(Number.isInteger(tasksPersisted())).toBe(true)
  })
})

describe('getTask', () => {
  it('should return the right task', () => {
    const testTaskText = 'test task'
    const id1 = persistTask(testTaskText)

    const task1 = getTask(id1)

    expect(task1.taskId).toEqual(id1)
    expect(task1.taskText).toEqual(testTaskText)
  })

  it('should throw if passed a non-integer number', () => {
    expect(() => {
      getTask(25.5)
    }).toThrow()
  })

  it('should (temporarily) throw if task does not exist', () => {
    expect(() => {
      getTask(255)
    }).toThrow()
  })
})
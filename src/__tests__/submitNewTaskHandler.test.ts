import { addNewTaskToDOM } from "addNewTaskToDOM"
import { submitNewTaskHandler } from "submitNewTaskHandler"
import { persistTask } from "tasks"

jest.mock('tasks')
jest.mock('addNewTaskToDOM')


describe('submitNewTaskHandler', () => {
  let mockEvent: Event
  let newTaskText: HTMLTextAreaElement
  beforeEach(() => {
    mockEvent = new Event('submit')
    mockEvent.preventDefault = jest.fn()
    newTaskText = document.createElement('textarea')
    newTaskText.value = 'test task text'
  })

  afterEach(() => {
    jest.resetAllMocks()
    newTaskText.remove()
  })

  it('should prevent event\'s default', () => {
    submitNewTaskHandler(mockEvent, newTaskText)

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1)
  })

  it('should empty (cleanup) textarea value after being called', () => {
    submitNewTaskHandler(mockEvent, newTaskText)
    expect(newTaskText.value).toBe('')
  })

  it('should call persistTask and addNewTaskToDOM with taskText value', () => {
    submitNewTaskHandler(mockEvent, newTaskText)

    expect(addNewTaskToDOM).toHaveBeenCalledTimes(1)
    expect(persistTask).toHaveBeenCalledTimes(1)
  })

  it('should not call persistTask & addNewTask (return early) if passed empty string', () => {
    newTaskText.value = ''

    submitNewTaskHandler(mockEvent, newTaskText)

    expect(addNewTaskToDOM).not.toHaveBeenCalled()
    expect(persistTask).not.toHaveBeenCalled()
  })
})
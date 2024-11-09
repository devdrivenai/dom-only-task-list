import { confirmDeleteBox } from "confirmDeleteBox"
import { deleteTask } from "tasks"

jest.mock('tasks')

const deleteTaskMock = deleteTask as jest.Mock

describe('confirmDeleteBox', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })
  describe('createOverlayBg', () => {
    it('should create a div with overlay-bg class', () => {
      expect(document.querySelector('.overlay-bg')).toBeNull()

      confirmDeleteBox('test task', 1234)

      expect(document.querySelector('.overlay-bg')).not.toBeNull()
    })

    it('should change overflow prop to hidden to avoid scrolling', () => {
      document.body.style.overflow = 'visible'

      confirmDeleteBox('test task', 1234)

      expect(document.body.style.overflow).toBe('hidden')
    })
  })

  it('should append confirm-delete-box to overlay-bg', () => {
    confirmDeleteBox('test task', 1234)

    const overlay = document.querySelector('.overlay-bg')
    expect(overlay).not.toBeNull()
    expect(overlay?.firstElementChild?.tagName).toBe('DIV')
    expect(overlay?.firstElementChild?.classList).toContain('confirm-delete-box')
  })

  it('should pass right task text to 2nd deleteBox paragraph', () => {
    const tasktext = 'Am I the right text?'
    confirmDeleteBox(tasktext, 1234)

    const pars = document.querySelectorAll('.confirm-delete-box > p')
    expect(pars).not.toHaveLength(0)
    const taskP = document.querySelector('.task-text')
    expect(taskP).not.toBeNull()
    expect(pars[1].innerHTML).toEqual(taskP?.innerHTML)
    expect(taskP?.innerHTML).toEqual(tasktext)
  })

  it('should return the deleteBox', () => {
    const returnValue = confirmDeleteBox('test task', 1234)
    expect(returnValue).toBeInstanceOf(HTMLDivElement)
    expect(returnValue.classList).toContain('confirm-delete-box')
  })

  describe('confirmDeleteHandler', () => {
    it('should pass right taskId to confirmDeleteHandler & delete it from DOM', () => {
      // prepare the dom
      const task = document.createElement('div')
      task.classList.add('task-item')
      task.setAttribute('id', 'deletable-task')
      const tasks = document.createElement('section')
      tasks.classList.add('tasks')
      const form = document.createElement('form')
      form.classList.add('new-task-form')
      document.body.append(task, tasks, form)
  
      confirmDeleteBox('test task', 1234)
  
      // assert it as HTMLButton so we can use click() 
      const deleteBtn = document.querySelector('.confirm-delete-btn') as HTMLButtonElement
      expect(deleteBtn).not.toBeNull()
  
      // task has id and class 
      expect(document.querySelector('#deletable-task')).not.toBeNull()
      expect(document.querySelector('.task-item')).not.toBeNull()
  
      deleteBtn.click()
      // expect taskId was passed correctly
      expect(deleteTaskMock).toHaveBeenCalledWith(1234)
      // expect task to have been deleted from dom
      expect(document.querySelector('#deletable-task')).toBeNull()
      expect(document.querySelector('.task-item')).toBeNull()

      // expect overlayBg removed
      expect(document.querySelector('.overlay-bg')).toBeNull() 
    })
  })

  describe('cancel', () => {
    it('should remove deletable-task id & overlay', () => {
      // prepare the dom
      const task = document.createElement('div')
      task.classList.add('task-item')
      task.setAttribute('id', 'deletable-task')
      const form = document.createElement('form')
      form.classList.add('new-task-form')
      document.body.append(task, form)

      confirmDeleteBox('test task', 1234)

      // assert it as HTMLButton so we can use click() 
      const cancelBtn = document.querySelector('.cancel-delete-btn') as HTMLButtonElement
      expect(cancelBtn).not.toBeNull()
  
      // task has id and class 
      expect(document.querySelector('#deletable-task')).not.toBeNull()
      expect(document.querySelector('.task-item')).not.toBeNull()
  
      cancelBtn.click()
      // expect task to remain in the dom, but id removed
      expect(document.querySelector('.task-item')).not.toBeNull()
      expect(document.querySelector('#deletable-task')).toBeNull()

      // expect overlayBg removed
      expect(document.querySelector('.overlay-bg')).toBeNull() 
    })
  })
})
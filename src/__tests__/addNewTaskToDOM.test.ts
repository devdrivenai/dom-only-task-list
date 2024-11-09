import { addNewTaskToDOM } from "addNewTaskToDOM";

describe('addNewTasktoDOM', () => {

  let tasks : HTMLElement

  beforeEach(() => {
    document.body.innerHTML = ''
    jest.clearAllMocks()

    tasks = document.createElement('section')
    tasks.classList.add('tasks')
    document.body.append(tasks)
  })


  it('should remove the no-tasks-msg div (if there)', () => {
    const noTasksMsg = document.createElement('div')
    noTasksMsg.classList.add('no-tasks-msg')
    document.body.appendChild(noTasksMsg)

    expect(document.body.contains(noTasksMsg)).toBe(true)
    addNewTaskToDOM('somestring', 123)
    expect(document.body.contains(noTasksMsg)).toBe(false)
  })

  it('should not throw error if no no-tasks-msg found', () => {
    
    addNewTaskToDOM('somestring', 123)

    expect(() => {
      addNewTaskToDOM('somestring', 123)
    }).not.toThrow()
  })

  it('should throw an error if called with empty string', () => {
    expect(() => {
      addNewTaskToDOM('', 123)
    }).toThrow()
  })

  it('should throw an error if called with a non-integer ID', () => {
    expect(() => {
      addNewTaskToDOM('somestring', 123.45)
    }).toThrow()
  })

  it('should create right elems with right id in dataset', () => {
    const taskid = 123
    const taskItem = () => document.querySelector(`.task-item[data-taskid="${taskid}"]`)
    expect(taskItem()).toBeNull()
    const input = () => document.querySelector(`input[data-taskid="${taskid}"]`)
    expect(input()).toBeNull()

    addNewTaskToDOM('somestring', taskid)

    expect(taskItem()).not.toBeNull()
    expect(input()).not.toBeNull()
  })

  it('should assign right taskId to (and do right edit through) editConfirmBtnHandler', () => {
    // prep arg(s)
    const taskid = 1234

    addNewTaskToDOM('test input', taskid)

    // prep dom for handler
    const form = document.createElement('form')
    form.classList.add('new-task-form')
    const input = document.querySelector(`input[data-taskid="${taskid}"]`) as HTMLInputElement
    expect(input).not.toBeNull()
    input.setAttribute('id', 'editable-task')
    // make sure input editable (emulating edit btn click)
    input.removeAttribute('disabled')
    input.value = 'new value'
    input.defaultValue = 'default value'
    const editConfirmBtn = document.querySelector(`.edit-confirm-btn[data-taskid="${taskid}"]`) as HTMLButtonElement
    editConfirmBtn.classList.add('active')
    expect(editConfirmBtn).not.toBeNull()
    document.body.append(form, input, editConfirmBtn)

    editConfirmBtn.click()

    expect(editConfirmBtn.classList).not.toContain('active')
    expect(input.getAttribute('id')).toBeNull()
    expect(input.hasAttribute('disabled')).toBe(true)

    expect(input.value).toBe('new value')
  })

  it('should assign right taskId to editBtnHandler and make input editable', () => {
    // prep arg(s)
    const taskid = 1234

    addNewTaskToDOM('test input', taskid)

    // prep dom
    const form = document.createElement('form')
    form.classList.add('new-task-form')
    const input = document.querySelector(`input[data-taskid="${taskid}"]`) as HTMLInputElement
    expect(input).not.toBeNull()
    const taskEditBtn = document.querySelector('.task-edit-btn') as HTMLButtonElement
    expect(taskEditBtn).not.toBeNull()
    const editConfirmBtn = document.querySelector(`.edit-confirm-btn[data-taskid="${taskid}"]`) as HTMLButtonElement
    expect(editConfirmBtn).not.toBeNull()
    document.body.append(form, input, taskEditBtn, editConfirmBtn)
    
    expect(input.hasAttribute('disabled')).toBe(true)
    expect(editConfirmBtn.classList).not.toContain('active')

    taskEditBtn.click()

    expect(input.hasAttribute('disabled')).toBe(false)
    expect(editConfirmBtn.classList).toContain('active')
  })

  it('should assign right taskId to deleteBtnHandler', () => {
    // prep arg(s)
    const taskid = 1234

    addNewTaskToDOM('test input', taskid)

    // prep dom for handler
    const form = document.createElement('form')
    form.classList.add('new-task-form')
    const newTaskItem = document.querySelector(`.task-item[data-taskid="${taskid}"]`)
    expect(newTaskItem).not.toBeNull()
    const input = document.querySelector(`input[data-taskid="${taskid}"]`) as HTMLInputElement
    expect(input).not.toBeNull()
    input.setAttribute('id', 'editable-task')
    input.value = 'task to delete'
    const deleteBtn = document.querySelector(`.task-delete-btn`) as HTMLButtonElement
    expect(deleteBtn).not.toBeNull()
    document.body.append(form, input, deleteBtn)

    const overlayBg = () => document.querySelector('.overlay-bg')
    expect(overlayBg()).toBeNull()

    deleteBtn.click()

    expect(input.hasAttribute('disabled')).toBe(true)
    expect(overlayBg()).not.toBeNull()
    expect(overlayBg()).toBeInstanceOf(HTMLDivElement)
    const taskP = document.querySelectorAll('.confirm-delete-box > p')[1]
    expect(taskP).not.toBeNull()
    expect(taskP.innerHTML).toBe('task to delete')
  })
})
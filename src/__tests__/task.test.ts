import * as task from "task"
import { addGenericElem, focusInput, getElement, toggleEditability } from "utils"
import { confirmDeleteBox } from "confirmDeleteBox"

jest.mock('utils', () => {
  return {
    getElement: jest.fn(),
    isHTMLElement: () => {
      return true
    },
    toggleEditability: jest.fn(),
    toggleId: () => {},
    focusInput: jest.fn(), 
    addGenericElem: jest.fn()
  }
})

jest.mock('confirmDeleteBox', () => ({
  confirmDeleteBox: jest.fn()
}))

const getelemMock = getElement as jest.Mock
const confirmDeleteBoxMock = confirmDeleteBox as jest.Mock

describe('selectFormAndBtns', () => {
  const actionBtn = document.createElement('button')
  actionBtn.classList.add('task-action-btn')

  const anotherActionBtn = document.createElement('button')
  anotherActionBtn.classList.add('task-action-btn')

  const formInput = document.createElement('input')
  const form = document.createElement('form')
  form.classList.add('new-task-form')

  getelemMock.mockImplementation((sel:string) => {
    const form = document.createElement('form')
    form.classList.add('new-task-form')
    document.body.appendChild(form)
    const newTaskForm = document.querySelector('.new-task-form')
    return newTaskForm
  })

  beforeEach(() => {
    jest.clearAllMocks()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    form.innerHTML = ''
  })


  it('should return an empty array when no form child or btn', () => {

    const formAndBtns = task.selectFormAndBtns()
    
    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(0)
  })

  it('should return an HTMLElement[] of 1 item when there\'s a single btn', () => {
    document.body.appendChild(actionBtn) 

    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(1)
    expect(formAndBtns[0]).toBeInstanceOf(HTMLElement)
  })

  it('should return an array of right length when there\'s btns', () => {
    document.body.append(actionBtn, anotherActionBtn)
    
    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(2)
  })

  it('should return an HTMLElement[] of 1 item when there\'s a single form child', () => {
    form.appendChild(formInput)
    document.body.insertBefore(form, document.body.firstElementChild) 

    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(1)
    expect(formAndBtns[0]).toBeInstanceOf(HTMLElement)
  })

  it('should return an array of right length when form has multiple children', () => {
    const btn = document.createElement('button')
    form.append(formInput, btn)
    document.body.insertBefore(form, document.body.firstElementChild)

    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(2)
  })

  it('should return an HTMLElement[] of 2 items when only 1 form child & 1 btn', () => {
    form.appendChild(formInput)
    document.body.insertBefore(form, document.body.firstElementChild)
    document.body.appendChild(actionBtn)

    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(2)
    for (const element of formAndBtns) {
      expect(element).toBeInstanceOf(HTMLElement)
    }
  })

  it('should return an HTMLElement[] of right length when multiple form children & btns', () => {
    const btn = document.createElement('button')
    form.append(formInput, btn)
    document.body.insertBefore(form, document.body.firstElementChild)   
    document.body.append(actionBtn, anotherActionBtn)
    
    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(4)
    for (const element of formAndBtns) {
      expect(element).toBeInstanceOf(HTMLElement)
    }
  })  
})

describe('toggleEditMode', () => {
let input: HTMLInputElement
let form: HTMLFormElement
let button: HTMLButtonElement

  beforeEach(() => {
    document.body.innerHTML = ''
    jest.clearAllMocks()
    input = document.createElement('input')
    input.defaultValue = 'default value'
    form = document.createElement('form')
    button = document.createElement('button')
    button.classList.add('edit-confirm-btn')
    form.append(input, button)
  })

  afterAll(() => {
    document.body.innerHTML = ''
    jest.clearAllMocks()
  })

  it('should save default value back to value if passed skip true', () => {

    task.toggleEditMode(input, true)

    expect(input.value).toEqual('default value')
  })

  it('should early return (not call later funcs) if text did not change', () => {
    input.value = 'default value'

    task.toggleEditMode(input)

    expect(toggleEditability).not.toHaveBeenCalled()
    expect(input.value).toEqual(input.defaultValue)
  })

  it('should change value and call later funcs if text changed & not skipped', () => {
    input.value = 'input actual value'

    task.toggleEditMode(input)

    expect(input.defaultValue).toEqual('input actual value')
    expect(toggleEditability).toHaveBeenCalled()
  })

  it('should toggle edit-confirm-btn\'s \'active\' class back and forth', () => {
    // change value so we can submit
    input.value = 'input actual value'

    getelemMock.mockReturnValueOnce(button)
    task.toggleEditMode(input)

    expect(button.classList).toHaveLength(2)
    expect(button.classList).toContain('active')

    // change value so we can submit
    input.value = 'another value'

    getelemMock.mockReturnValueOnce(button)
    task.toggleEditMode(input)

    expect(button.classList).toHaveLength(1)
    expect(button.classList).not.toContain('active')
  })
})

describe('editConfirmBtnHandler', () => {
  let editConfirmBtn: HTMLElement
  let inputField: HTMLInputElement

  const toggleEditModeSpy = jest.spyOn(task, 'toggleEditMode')

  beforeEach(() => {
    document.body.innerHTML = ''
    jest.clearAllMocks()

    editConfirmBtn = document.createElement('button')
    editConfirmBtn.classList.add('edit-confirm-btn')
    editConfirmBtn.addEventListener('click', () => task.editConfirmBtnHandler('1234'))
  
    inputField = document.createElement('input')
    inputField.setAttribute('id', 'editable-task')
    inputField.value = 'default value'
    inputField.value = 'new value'

    document.body.appendChild(inputField)
    document.body.appendChild(editConfirmBtn)
  })


  it('should call toggleEditMode', () => {
    getelemMock.mockReturnValueOnce(inputField)
    editConfirmBtn.click()

    expect(toggleEditModeSpy).toHaveBeenCalled()
    expect(toggleEditModeSpy).toHaveBeenCalledWith(inputField)
  })

  it('should call focusInput and early return if value did not change', () => {
    inputField.value = 'unchanged'
    inputField.defaultValue = 'unchanged'
    getelemMock.mockReturnValueOnce(inputField)

    editConfirmBtn.click()

    expect(focusInput).toHaveBeenCalledTimes(1)
    expect(toggleEditModeSpy).not.toHaveBeenCalled()
  })

  it('should throw if there is input sibling has no id editable-task', () => {
    const testBtn = document.createElement('button')
    const testInput = document.createElement('input')
    getelemMock.mockReturnValueOnce(testInput)
    testBtn.addEventListener('click', () => task.editConfirmBtnHandler('1234'))
    document.body.append(testInput, testBtn)   

    expect(() => {
      task.editConfirmBtnHandler('1234')
    }).toThrow()
  })
})

describe('editBtnHandler', () => {
  let testEvent: Event
  const toggleEditModeSpy = jest.spyOn(task, 'toggleEditMode')

  beforeEach(() => {
    document.body.innerHTML = ''
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should throw if passed an empty string', () => {
    testEvent = new Event('click')
    expect(() => {
      task.editBtnHandler('')
    }).toThrow("The arg passed should be the task id (str) but is an empty string.")
  })

  it('should throw if passed in a taskId (string) that can\'t be converted to int', () => {
    expect(() => {
      task.editBtnHandler('wrong input')
    }).toThrow("This taskId can\'t be converted to an integer.")
  })

  it('should call toggleEditMode with right args if input is OK', () => {
    const testInput = document.createElement('input')
    getelemMock.mockReturnValue(testInput)
    const testEditBtn = document.createElement('button')

    testEvent = new Event('click')
    testEditBtn.addEventListener('click', () => task.editBtnHandler('1234'))
    testEditBtn.dispatchEvent(testEvent)
   
    expect(toggleEditModeSpy).toHaveBeenCalledWith(testInput, true)
  })
})

describe('deleteBtnHandler', () => {
  const taskItem = document.createElement('div')
  const testInputField = document.createElement('input')
  const selectFormAndBtnsSpy = jest.spyOn(task, 'selectFormAndBtns')

  beforeEach(() => {
    document.body.innerHTML = ''
    jest.resetAllMocks()
  })
  
  it('should set id deletable-task to taskItem', () => {
    getelemMock.mockReturnValueOnce(taskItem).mockReturnValueOnce(testInputField)
    selectFormAndBtnsSpy.mockReturnValueOnce([document.createElement('form')])
    
    task.deleteBtnHandler('1234')
    
    expect(taskItem.getAttribute('id')).toEqual('deletable-task')
  })

  it('should call toggleEditability once', () => {
    getelemMock.mockReturnValueOnce(taskItem).mockReturnValueOnce(testInputField)
    const mockToggleEditability = toggleEditability as jest.Mock
    mockToggleEditability.mockImplementationOnce(() => {})
    selectFormAndBtnsSpy.mockReturnValueOnce([document.createElement('form')])
    
    task.deleteBtnHandler('1234')
    
    expect(mockToggleEditability).toHaveBeenCalledTimes(1)
  })

  it('should call createConfirmBox once with right args', () => {
    testInputField.value = 'test value'
    getelemMock.mockReturnValueOnce(taskItem).mockReturnValueOnce(testInputField)
    const mockToggleEditability = toggleEditability as jest.Mock
    mockToggleEditability.mockImplementationOnce(() => {})
    selectFormAndBtnsSpy.mockReturnValueOnce([document.createElement('form')])
    
    task.deleteBtnHandler('1234')
    
    expect(confirmDeleteBoxMock).toHaveBeenCalledTimes(1)
    expect(confirmDeleteBoxMock).toHaveBeenCalledWith('test value', 1234)
  })
})

describe('loadNoTasksMsg', () => {
  it('should call addGenericElem once', () => {
    task.loadNoTaskMsg()

    expect(addGenericElem).toHaveBeenCalled()
  })
})
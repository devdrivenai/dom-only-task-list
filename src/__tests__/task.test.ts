// import { selectFormAndBtns, toggleEditMode } from "task"
import * as task from "task"
import { focusInput, toggleEditability } from "utils"

jest.mock('utils', () => {
  return {
    getElement: (sel: string) => {
      const form = document.createElement('form')
      form.classList.add('new-task-form')
      document.body.appendChild(form)
      // console.log('mock getElement called...')
      const newTaskForm = document.querySelector('.new-task-form')
      return newTaskForm
    },
    isHTMLElement: () => {
      return true
    },
    toggleEditability: jest.fn(),
    toggleId: () => {},
    focusInput: jest.fn()
  }
})

describe('selectFormAndBtns', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    document.body.innerHTML = ''
  })


  it('should return an empty array when no form child or btn', () => {
    const formAndBtns = task.selectFormAndBtns()
    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(0)
  })

  it('should return an HTMLElement[] of 1 item when there\'s a single btn', () => {
    const actionBtn = document.createElement('button')
    actionBtn.classList.add('task-action-btn')
    document.body.appendChild(actionBtn) 
    
    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(1)
    expect(formAndBtns[0]).toBeInstanceOf(HTMLElement)
  })

  it('should return an array of right length when there\'s btns', () => {
    const actionBtn = document.createElement('button')
    actionBtn.classList.add('task-action-btn')
    document.body.appendChild(actionBtn) 

    const anotherActionBtn = document.createElement('button')
    anotherActionBtn.classList.add('task-action-btn')
    document.body.appendChild(anotherActionBtn) 
    
    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(2)
  })

  it('should return an HTMLElement[] of 1 item when there\'s a single form child', () => {
    const formInput = document.createElement('input')
    const form = document.createElement('form')
    form.classList.add('new-task-form')
    form.appendChild(formInput)
    document.body.insertBefore(form, document.body.firstElementChild) 
    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(1)
    expect(formAndBtns[0]).toBeInstanceOf(HTMLElement)
  })

  it('should return an array of right length when form has multiple children', () => {
    const formInput = document.createElement('input')
    const btn = document.createElement('button')
    const form = document.createElement('form')
    form.classList.add('new-task-form')
    form.append(formInput, btn)
    document.body.insertBefore(form, document.body.firstElementChild)

    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(2)
  })

  it('should return an HTMLElement[] of 2 items when only 1 form child & 1 btn', () => {
    const formInput = document.createElement('input')
    const form = document.createElement('form')
    form.classList.add('new-task-form')
    form.appendChild(formInput)
    document.body.insertBefore(form, document.body.firstElementChild)
    
    const actionBtn = document.createElement('button')
    actionBtn.classList.add('task-action-btn')
    document.body.appendChild(actionBtn)

    const formAndBtns = task.selectFormAndBtns()

    expect(formAndBtns).toBeInstanceOf(Array)
    expect(formAndBtns).toHaveLength(2)
    for (const element of formAndBtns) {
      expect(element).toBeInstanceOf(HTMLElement)
    }
  })

  it('should return an HTMLElement[] of right length when multiple form children & btns', () => {
    const formInput = document.createElement('input')
    const btn = document.createElement('button')
    const form = document.createElement('form')
    form.classList.add('new-task-form')
    form.append(formInput, btn)
    document.body.insertBefore(form, document.body.firstElementChild)   
    
    const actionBtn = document.createElement('button')
    actionBtn.classList.add('task-action-btn')
    const anotherActionBtn = document.createElement('button')
    anotherActionBtn.classList.add('task-action-btn')
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

  it('should throw if a btn with class edit-confirm-btn doesn\'t exist', () => {
    const input = document.createElement('input')

    expect(() => {
      task.toggleEditMode(input)
    }).toThrow()

    const button = document.createElement('button')
    const form = document.createElement('form')
    form.append(input, button)

    expect(() => {
      task.toggleEditMode(input)
    }).toThrow()
  })

  it('should toggle edit-confirm-btn\'s \'active\' class back and forth', () => {
    // change value so we can submit
    input.value = 'input actual value'

    task.toggleEditMode(input)

    expect(button.classList).toHaveLength(2)
    expect(button.classList).toContain('active')

    // change value so we can submit
    input.value = 'another value'

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
    editConfirmBtn.addEventListener('click', task.editConfirmBtnHandler)
  
    inputField = document.createElement('input')
    inputField.setAttribute('id', 'editable-task')
    inputField.value = 'default value'
    inputField.value = 'new value'
  
    document.body.appendChild(inputField)
    document.body.appendChild(editConfirmBtn)
  })


  it('should call toggleEditMode', () => {
    editConfirmBtn.click()

    expect(toggleEditModeSpy).toHaveBeenCalled()
    expect(toggleEditModeSpy).toHaveBeenCalledWith(inputField)
  })

  it('should call focusInput and early return if value did not change', () => {
    inputField.value = 'unchanged'
    inputField.defaultValue = 'unchanged'

    editConfirmBtn.click()

    expect(focusInput).toHaveBeenCalledTimes(1)
    expect(toggleEditModeSpy).not.toHaveBeenCalled()
  })

  it('should throw if there is no input sibling', () => {
    const testBtn = document.createElement('button')
    const testEvent = new Event('click')
    testBtn.addEventListener('click', task.editConfirmBtnHandler)  

    expect(() => {
      task.editConfirmBtnHandler(testEvent)
    }).toThrow()
  })

  it('should throw if there is input sibling has no id editable-task', () => {
    const testBtn = document.createElement('button')
    const testEvent = new Event('click')
    const testInput = document.createElement('input')
    testBtn.addEventListener('click', task.editConfirmBtnHandler)
    document.body.append(testInput, testBtn)
    

    expect(() => {
      task.editConfirmBtnHandler(testEvent)
    }).toThrow()
  })
})

describe('editBtnHandler', () => {
  let testEvent: Event

  const toggleEditModeSpy = jest.spyOn(task, 'toggleEditMode')

  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should throw if it doesnt find an input field', () => {
    testEvent = new Event('click')
    expect(() => {
      task.editBtnHandler(testEvent)
    }).toThrow()
  })

  it('should throw if element found in traversing DOM is not an input', () => {
    const testElem = document.createElement('div')
    const inputContainer = document.createElement('div')
    const testBtn = document.createElement('button')
    const btnContainer = document.createElement('div')
    inputContainer.appendChild(testElem)
    btnContainer.appendChild(testBtn)
    document.body.append(inputContainer, btnContainer)

    testEvent = new Event('click')
    expect(() => {
      task.editBtnHandler(testEvent)
    }).toThrow()
  })

  it('should call toggleEditMode with right args if input is OK', () => {
    const testInput = document.createElement('input')
    const testConfirmBtn = document.createElement('button')
    testConfirmBtn.classList.add('edit-confirm-btn')
    const inputContainer = document.createElement('div')
    const testEditBtn = document.createElement('button')
    const btnContainer = document.createElement('div')
    inputContainer.appendChild(testInput)
    btnContainer.appendChild(testEditBtn)
    document.body.append(inputContainer, btnContainer)

    testEvent = new Event('click')
    testEditBtn.addEventListener('click', task.editBtnHandler)
    testEditBtn.dispatchEvent(testEvent)

    expect(toggleEditModeSpy).toHaveBeenCalledWith(testInput, true)
  })
})

// describe('deleteBtnHandler', () => {

// })
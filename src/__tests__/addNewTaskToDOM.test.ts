import { addNewTaskToDOM } from "addNewTaskToDOM";
import { addGenericElem, addMaskedIcon, getElement } from "utils";

jest.mock('utils')

describe('addNewTasktoDOM', () => {

  beforeEach(() => {
    jest.clearAllMocks()
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
    expect(getElement).toHaveBeenCalled()
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

  it('should call the right functions the correct number of times', () => {
    addNewTaskToDOM('somestring', 123)

    expect(getElement).toHaveBeenCalledTimes(1)
    expect(addGenericElem).toHaveBeenCalledTimes(7)
    expect(addMaskedIcon).toHaveBeenCalledTimes(3)
  })
})
import { addGenericElem, addMaskedIcon, focusInput, getElement, isHTMLElement, toggleEditability, toggleId } from "utils";

describe('addGenericElem', () => {
  let parent: HTMLElement

  beforeEach(() => {
    parent = document.createElement('div')
  })

  it('should create & append elem with specified tag & right text', () => {
    const newChild = addGenericElem(parent, 'p', { text: 'some text here' })

    expect(parent.contains(newChild)).toBe(true)
    expect(newChild.tagName).toBe('P')

    expect(newChild.textContent).toBe('some text here')
  })

  it('should create and append elem with no options', () => {
    const newChild = addGenericElem(parent, 'main')

    expect(parent.contains(newChild)).toBe(true)
    expect(newChild.tagName).toBe('MAIN')
  })

  it('should add one or more classes to created elem', () => {
    const withOneClass = addGenericElem(parent, 'section', { classes: ['one-class-only'] })
    const withTwoClasses = addGenericElem(parent, 'div', { classes: ['one-class', 'another-class'] })

    expect(withOneClass.tagName).toBe('SECTION')
    expect(withTwoClasses.tagName).toBe('DIV')
    expect(withOneClass.classList).toContain('one-class-only')
    expect(withTwoClasses.classList.contains('one-class')).toBe(true);
    expect(withTwoClasses.classList.contains('another-class')).toBe(true);
  })

  it('should add event listeners correctly', () => {
    const handler = jest.fn()

    const targetElement = addGenericElem(parent, 'button', { eventListeners: { click: handler } })

    expect(targetElement.tagName).toBe('BUTTON')
    targetElement.click()

    expect(handler).toHaveBeenCalled()
  })

  it('should pass right event object to event listener', () => {
    const clickHandler = jest.fn((event) => {
      expect(event).toBeInstanceOf(MouseEvent)
      expect(event.type).toBe('click')
    })

    const targetElement = addGenericElem(parent, 'button', { eventListeners: { click: clickHandler } })

    targetElement.click()

    expect(clickHandler).toHaveBeenCalledTimes(1)
  })

  it('should attach multiple event listeners', () => {
    const clickHandler = jest.fn()
    const mouseOverHandler = jest.fn()

    const targetElement = addGenericElem(parent, 'button', { 
      eventListeners: { 
        click: clickHandler,
        mouseover: mouseOverHandler
      } 
    })

    targetElement.click()

    const testMouseEvent = new MouseEvent('mouseover')
    targetElement.dispatchEvent(testMouseEvent)

    expect(clickHandler).toHaveBeenCalledTimes(1)
    expect(mouseOverHandler).toHaveBeenCalledTimes(1)
  })

  it('should add standard attributes correctly', () => {
    const newChild = addGenericElem(parent, 'input', {
      attribs: {
        autocomplete: 'off',
        value: 'some text here',
        disabled: true
      }
    })

    expect(newChild.tagName).toBe('INPUT')
    expect(newChild.autocomplete).toBe('off')
    expect(newChild.value).toBe('some text here')
    expect(newChild.disabled).toBe(true)
  })

  it('should add dataset attributes correctly', () => {
    const newChild = addGenericElem(parent, 'input', {
      attribs: {
        dataset: {
          key: 'value'
        }
      }
    })

    expect(newChild.dataset.key).toBe('value')
  })

  it('should add both standard & dataset attributes correctly', () => {
    const newChild = addGenericElem(parent, 'input', {
      attribs: {
        dataset: {
          key: 'value'
        },
        autocomplete: 'off',
        value: 'some text here',
        disabled: true
      }
    })

    expect(newChild.autocomplete).toBe('off')
    expect(newChild.value).toBe('some text here')
    expect(newChild.disabled).toBe(true)
    expect(newChild.dataset.key).toBe('value')
  })

  it('should handle empty classes and eventListeners gracefully', () => {
    const newElem = addGenericElem(parent, 'div', { classes: [], eventListeners: {} })
    expect(newElem.classList.length).toBe(0)
  })
})

describe('addMaskedIcon', () => {
  let parent: HTMLElement
  const urlStr = '../path/to/an/image.svg'

  beforeEach(() => {
    parent = document.createElement('div')
  })

  it('should add a div and apply the correct mask', () => {
    const newIcon = addMaskedIcon(parent, urlStr)

    expect(parent.contains(newIcon)).toBe(true)
    expect(newIcon?.style.mask).toBe(`url(${urlStr}) no-repeat center`);
  })

  it('should trim string with empty space, append & mask', () => {
    const untrimmedStr = '    url/here    '
    const trimmedStr = 'url/here'

    const newIcon = addMaskedIcon(parent, untrimmedStr)

    expect(parent.contains(newIcon)).toBe(true)
    expect(newIcon?.style.mask).toBe(`url(${trimmedStr}) no-repeat center`);
  })

  it('should throw an error if urlStr is an empty string & have no side effects', () => {
    try {
      addMaskedIcon(parent, '')
    } catch (error) {
      expect(error).toBeDefined()
    }
    expect(parent.hasChildNodes()).toBe(false)
  })

  it('should add icon class if it has other classes assigned, too', () => {
    const newIcon = addMaskedIcon(parent, urlStr, {classes: ['class-1']})

    expect(newIcon.classList).toContain('icon')
    expect(newIcon.classList).toHaveLength(2)
  })
})

describe('isHTMLElement', () => {
  it('should return true if elem is an instance of HTMLElement', () => {
    const testDiv = document.createElement('div')
    expect(isHTMLElement(testDiv)).toBe(true)
  })

  it('should return false if elem is NOT an instance of HTMLElement', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    expect(isHTMLElement(svg)).toBe(false)
  })
})

describe('getElement', () => {
  it('should return an element in the DOM when passed right selector', () => {
    const testElem = document.createElement('aside')
    document.body.appendChild(testElem)

    expect(getElement('aside')).not.toBeNull()

    document.body.removeChild(testElem)
  })

  it('should throw an error if no such element in the DOM', () => {
    expect(() => {
      getElement('noSuchElement')
    }).toThrow()
  })
})

describe('toggleEditability', () => {
  it('should turn disabled (single) element into editable', () => {
    const disabledInput = document.createElement('input')
    disabledInput.setAttribute('disabled', '')

    toggleEditability(disabledInput)    

    expect(disabledInput.getAttribute('disabled')).toBeNull()
  })

  it('should turn editable (single) element into disabled', () => {
    const editableInput = document.createElement('input')
    expect(editableInput.getAttribute('disabled')).toBeNull()

    toggleEditability(editableInput)    

    expect(editableInput.hasAttribute('disabled')).toBe(true)
  })

  it('should turn (multiple) disabled elements into editable', () => {
    const disabledInputs = Array.from({length: 3},() => {
      const disabledInput = document.createElement('input')
      disabledInput.setAttribute('disabled', '')
      return disabledInput
    })


    toggleEditability(disabledInputs)    

    disabledInputs.forEach(input => {
      expect(input.getAttribute('disabled')).toBeNull()
    })
  })

  it('should turn (multiple) editable elements into disabled', () => {
    const editableInputs = Array.from({length: 3},() => {
      const editableInput = document.createElement('input')
      expect(editableInput.getAttribute('disabled')).toBeNull()
      return editableInput
    })

    toggleEditability(editableInputs)    

    editableInputs.forEach(input => {
      expect(input.hasAttribute('disabled')).toBe(true)
    })
  })

  it('should turn disabled (single) non-input element into editable and back', () => {
    const disabledElem = document.createElement('p')
    disabledElem.setAttribute('disabled', '')

    toggleEditability(disabledElem)    

    expect(disabledElem.getAttribute('disabled')).toBeNull()

    toggleEditability(disabledElem)
    expect(disabledElem.hasAttribute('disabled')).toBe(true)
  })
})

describe('toggleId', () => {
  let testElem : HTMLElement

  beforeEach(() => {
    testElem = document.createElement('div')
    document.body.appendChild(testElem)
  })

  afterEach(() => {
    document.body.removeChild(testElem)
  })

  it('should remove the ID from an element that has such ID', () => {
    testElem.setAttribute('id', 'someid')

    toggleId('someid', testElem)
    
    expect(testElem.getAttribute('id')).toBeNull()
    expect('id' in window).toBe(false)
  })

  it('should add the id to elem if it did not have it', () => {
    expect(testElem.getAttribute('id')).toBeNull()
    expect('id' in window).toBe(false)

    toggleId('someid', testElem)
    expect(testElem.getAttribute('id')).toBe('someid')
  })

  it('should throw if empty string', () => {
    expect(() => {
      toggleId('', testElem)
    }).toThrow()
  })

  it('should throw if elem has a different ID', () => {
    testElem.setAttribute('id', 'someotherid')    
    
    expect(testElem.getAttribute('id')).toBeTruthy()
    expect(() => {
      toggleId('someid', testElem)
    }).toThrow()
  })

  it('should throw if elem is not in the DOM', () => {
    expect(() => {
      toggleId('anyid', null as unknown as HTMLElement)
    }).toThrow()
  })
})

describe('focusInput', () => {
  let inputField : HTMLInputElement
  
  beforeEach(() => {
    inputField = document.createElement('input')
    document.body.appendChild(inputField)
    inputField.value = 'some text here'
  })

  afterEach(() => {
    document.body.removeChild(inputField)
  })

  it('should put the focus on the input at the end of text', () => {    
    focusInput(inputField)

    expect(document.activeElement).toBe(inputField)
    // is cursor at the end?
    expect(inputField.selectionStart).toBe(inputField.value.length)
  })

  it('should throw if input is disabled', () => {
    inputField.setAttribute('disabled', '')

    expect(() => {
      focusInput(inputField)
    }).toThrow()
  })
})
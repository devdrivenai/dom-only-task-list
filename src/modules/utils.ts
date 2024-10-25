interface HTMLElementOptions<T extends keyof HTMLElementTagNameMap> {
  classes?: string[],
  eventListeners?: { [K in keyof GlobalEventHandlersEventMap]?: (ev: GlobalEventHandlersEventMap[K]) => any},
  attribs?: Partial<HTMLElementTagNameMap[T]> | { 'dataset': {[key: string]: string}},
  text?: string
}

export const addGenericElem = <T extends keyof HTMLElementTagNameMap>(
  appendTo: HTMLElement, 
  elemTag: T,
  options: HTMLElementOptions<T> = {}
) => {
  const elem = document.createElement(elemTag);

  const { classes = [], eventListeners = {}, attribs = {}, text = '' } = options
  
  if (text) {
    elem.textContent = text
  }

  classes.forEach(className => elem.classList.add(className))

  for (const [attrib, value] of Object.entries(attribs)) {
    if (attrib === 'dataset') {
      for (const [dataAttrib, dataValue] of Object.entries(value as {[key: string]: string})) {
        elem.dataset[dataAttrib] = dataValue
      }
    } else {
      elem.setAttribute(attrib, value as string)
    }
  }

  for (const [event, listener] of Object.entries(eventListeners)) {
    elem.addEventListener(event, listener as EventListener)
  }

  return appendTo.appendChild(elem); // should return appended child
};

// masked to change fill color upon theme change
export const addMaskedIcon = <T extends keyof HTMLElementTagNameMap>(  
  appendTo: HTMLElement, 
  options: HTMLElementOptions<T> = {},
  urlStr: string 
) => {
    // is the spread even necessary here?
    const icon = addGenericElem(appendTo, 'div', {...options})
    icon.style.mask = `url(${urlStr}) no-repeat center`
}

export const isHTMLElement = (element: Element): element is HTMLElement => {
  return element instanceof HTMLElement
}

export const getElement = <T extends Element>(selector: string): T | null => {
  const elem = document.querySelector<T>(selector)

  if (!elem) {
    console.warn(`There is no element for selector "${selector}" in the DOM`)
  }

  return elem
}

const toggleDisabledAttrib = (elem: HTMLElement) => {
  // checks nullity first because attrib is string | null
  // so empty string (set below) would be falsy
  if (elem.getAttribute('disabled') === null) {
    elem.setAttribute('disabled', '')
  } else {
    elem.removeAttribute('disabled')
  }
}

export const toggleEditability = (elemSet: HTMLElement | HTMLElement[]) => {
  if (Array.isArray(elemSet)) {
    for (const elem of elemSet) {
      toggleDisabledAttrib(elem)
    }
  } else {
    toggleDisabledAttrib(elemSet)
  }
}

export const toggleId = (id: string, elem: HTMLElement) => {
  if (!document.querySelector(`#${id}`) && !(id in window)) {
    elem.setAttribute('id', id)
  } else if (document.querySelector(`#${id}`)) {
    elem.removeAttribute('id')
  }
}

export const focusInput = (inputField: HTMLInputElement) => {
  inputField.focus()
  // make sure cursor is at the end
  inputField.selectionStart = inputField.value.length
}
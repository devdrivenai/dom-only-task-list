export const addGenericElem = (appendTo, elemTag, options = {}) => {
  const elem = document.createElement(elemTag);

  const { classes = [], eventListeners = {}, attribs = {}, text = '' } = options
  
  if (text) {
    elem.textContent = text
  }

  classes.forEach(className => elem.classList.add(className))

  for (const [attrib, value] of Object.entries(attribs)) {
    if (attrib === 'dataset') {
      for (const [dataAttrib, dataValue] of Object.entries(value)) {
        elem.dataset[dataAttrib] = dataValue
      }
    } else {
      elem.setAttribute(attrib, value)
    }
  }

  for (const [event, listener] of Object.entries(eventListeners)) {
    elem.addEventListener(event, listener)
  }

  return appendTo.appendChild(elem); // should return appended child
};

const toggleDisabledAttrib = (elem) => {
  if (elem.getAttribute('disabled')) {
    elem.removeAttribute('disabled')
  } else {
    elem.setAttribute('disabled', true)
  }
}

export const isHtmlElem = (elem) => {
  return elem?.classList
}

export const toggleEditability = (elemSet) => {
  if (!Array.isArray(elemSet) && !elemSet.classList) return
  let allDisabled = true
  if (elemSet.classList) {
    toggleDisabledAttrib(elemSet)
  } else {
    for (const elem of elemSet) {
      if (elem.classList) {
        toggleDisabledAttrib(elem)
      } else {
        allDisabled = false
      }
    }
  }
  return allDisabled
}

export const toggleId = (id, elem) => {
  if (isHtmlElem(elem)) {
    if (!document.querySelector(`#${id}`) && !window.id) {
      elem.setAttribute('id', id)
    } else if (document.querySelector(`#${id}`)) {
      elem.removeAttribute('id')
    }
  }
}
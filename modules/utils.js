export const addGenericElem = (appendTo, elemTag, text = "") => {
  const elem = document.createElement(elemTag);
  let textNode = document.createTextNode(text);
  if (textNode.length) {
    elem.appendChild(textNode);
  }
  return appendTo.appendChild(elem); // should return appended child
};

export const addInputElement = (appendTo, textVal = '') => {
  const inputElem = addGenericElem(appendTo, 'input')
  inputElem.value = textVal
  return inputElem
}

export const addDefaultEvent = (eventType, targetElem, handler) => {
  targetElem.addEventListener(eventType, (ev) => {
    handler(ev);
  });
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
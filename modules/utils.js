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
  // inputElem.setAttribute('disabled', true)
  return inputElem
}

export const addDefaultEvent = (eventType, targetElem, handler) => {
  targetElem.addEventListener(eventType, (ev) => {
    handler(ev);
  });
};
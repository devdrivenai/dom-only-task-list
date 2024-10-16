import { newTaskForm } from "./DOMSelectors.js"

const makeEditable = (elem) => {
  elem.removeAttribute('disabled')
}

export const makeUneditable = (elem) => {
  elem.setAttribute('disabled', true)
}

export const editBtnHandler = (ev) => {
  const editBtn = ev.target
  console.log(`you just clicked: ${editBtn}`)
  const actionBtns = document.querySelectorAll('.task-action-btn')
  // const actionBtns = document.getElementsByClassName('task-action-btn')
  console.log(`actionBtns elems: ${actionBtns.length}`)
  for (let btn of actionBtns) {
    console.log(btn)
    btn.setAttribute('disabled', true)
  }
  for (let child of newTaskForm.children) {
    child.setAttribute('disabled', true)
  }
  const taskTextInput = editBtn.parentElement.previousElementSibling.firstElementChild
  const textToEdit = taskTextInput.value
  // console.log(`text to edit is ${textToEdit}`)

  taskTextInput.classList.add('editable-task')
  taskTextInput.setAttribute('data-text', textToEdit)
  makeEditable(taskTextInput)
  document.querySelector('.editable-task').focus()

  const confirmBtn = taskTextInput.nextElementSibling
  confirmBtn.classList.add('active')

}
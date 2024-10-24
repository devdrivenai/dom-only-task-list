import { getElement } from "./utils.js"

export const newTaskForm = getElement<HTMLFormElement>(".new-task-form")

export const newTaskText = getElement<HTMLTextAreaElement>(".new-task-text")

export const tasksSection = getElement<HTMLElement>('.tasks')

export const allFormChildren: HTMLElement[] = newTaskForm ? Array.from(newTaskForm.children) as HTMLElement[] : []
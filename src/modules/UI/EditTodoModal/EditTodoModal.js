import "./EditTodoModal.css";

import controller from "../../controller.js";
import { subscribe } from "../../observer.js";
import { createDOMElement, createFormInput, createFormSelectInput, createOption }  from "../../domManipulators.js";
import { format } from "date-fns";

export default function createEditTodoModal() {
    const title = createFormInput("text", "title", "title", "Title", "title");
    const description = createFormInput("text", "description", "description", "Description", "description");
    const priority = createFormInput("number", "priority", "priority", "Priority", "priority");
    const date = createFormInput("datetime-local", "date", "date", "Date", "date");
    
    const titleInput = title.querySelector("input");
    const descriptionInput = description.querySelector("input");
    const priorityInput = priority.querySelector("input");
    const dateInput = date.querySelector("input");
    const todoInput = createDOMElement("input", { type: "hidden", value: null });

    const submitBtn = createDOMElement("button", { class: "form-submit-btn" }, "Save");
    const closeBtn = createDOMElement("button", { type: "button", class: "form-close-btn" }, "close");

    const projectsData = controller.getAllProjects();
    const projectsOptionData = projectsData.map(project => ({ name: project.title, value: project.id, disabled: false }));
    // Add option for inbox
    projectsOptionData.unshift({ name: "Inbox", value: "", disabled: false });

    const project = createFormSelectInput("project", "project", "Project", projectsOptionData, 0);
    const projectInput = project.querySelector("select#project");

    const form = createDOMElement("form", {
        class: "modal__form",
    }, closeBtn, title, description, priority, date, todoInput, project, submitBtn)

    const modal = createDOMElement("dialog", { class: "modal" }, form);

    const display = modal;

    closeBtn.addEventListener("click", () => modal.close());
   
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const todoId = todoInput.value;

        controller.editTodo(todoId, "title", titleInput.value);
        controller.editTodo(todoId, "description", descriptionInput.value);
        controller.editTodo(todoId, "date", dateInput.value);
        controller.editTodo(todoId, "priority", priorityInput.value);
        controller.editTodo(todoId, "projectId", projectInput.value);

        form.reset();
        modal.close();
    });

    subscribe("editTodo", (todoId) => {
        todoInput.value = todoId;
        render(todoId);
        modal.showModal();
    });

    function render(todoId) {
        todoInput.value = todoId;
        const todo = controller.getTodo(todoId);

        titleInput.value = todo.title;
        descriptionInput.value = todo.description;
        priorityInput.value = todo.priority;

        if (todo.date) {
            const dateString = format(todo.date, "yyyy-MM-dd'T'HH:mm");
            dateInput.value = dateString;
        } else {
            dateInput.value = "";
        }
        
        const projects = controller.getAllProjects();
        const projectsOptionData = projects.map(project => ({ name: project.title, value: project.id, disabled: false }));
        // Add option for inbox
        projectsOptionData.unshift({ name: "Inbox", value: "", disabled: false });
        
        const projectsOptions = projectsOptionData.map(optionData => createOption(optionData));
        projectsOptions.forEach(optionElement => {
            if (optionElement.value === todo.projectId) {
                optionElement.setAttribute("selected", true);
            }
        });
        projectInput.textContent = "";
        projectInput.append(...projectsOptions);
    }

    return display;
}
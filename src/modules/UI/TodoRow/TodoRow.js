import "./TodoRow.css";

import trashIconSrc from "../../../img/trash_icon.svg";
import editIconSrc from "../../../img/edit_icon.svg";

import { format } from "date-fns";
import controller from "../../controller";
import { createDOMElement }  from "../../domManipulators.js";
import observer from "../../observer.js";

export default function createTodoRow(todo) {
    const description = createDOMElement("div", { class: "todo-row__description" }, todo.description);
    const title = createDOMElement("div", { class: "todo-row__title" }, todo.title);
    const priority = createDOMElement("div", { class: "todo-row__priority" }, `P${todo.priority}`);

    const dateString = todo.date ? format(todo.date, "ccc hh:mm a (MMM d)") : "";
    const date = createDOMElement("div", { class: "todo-row__date" }, dateString);

    const trashIcon = createDOMElement("img", { 
        class: "todo-row__trash-icon",
        src: trashIconSrc, 
        alt: "trash icon"
    });

    const editIcon = createDOMElement("img", { 
        class: "todo-row__edit-icon",
        src: editIconSrc, 
        alt: "edit icon"
    });

    const deleteBtn = createDOMElement("button", { class: "todo-row__delete-btn"}, trashIcon);
    const expandBtn = createDOMElement("button", { class: "todo-row__expand-btn" });
    const editBtn = createDOMElement("button", { class: "todo-row__edit-btn" }, editIcon);

    const checkbox = createDOMElement("input", {
        class: "todo-row__checkbox",
        type: "checkbox",
    });
    checkbox.checked = todo.completed;
    // the checked attribute is weird. setAttribute (how createDOMElement 
    // adds attributes) doesn"t work because the property is not 
    // "reflective." See: https://stackoverflow.com/a/57617754

    const expanded = createDOMElement("div", {
        class: "todo-row__expanded",
        hidden: true,
    }, description);

    const main = createDOMElement("div", { 
        class: "todo-row__main" 
    }, checkbox, expandBtn, title, date, priority, editBtn, deleteBtn);

    const display = createDOMElement("div", {
        class: "todo-row",
    }, main, expanded)

    if (todo.completed) display.classList.add("todo-row--completed")

    if (todo.priority >= 1 && todo.priority <= 4) {
        display.classList.add(`todo-row--p${todo.priority}`);
    }

    deleteBtn.addEventListener("click", () => controller.removeTodo(todo.id));
    checkbox.addEventListener("click", () => {
        controller.toggleTodoCompleted(todo.id);
        display.classList.toggle("todo-row--completed");
    });
    expandBtn.addEventListener("click", () => {
        toggleExpanded()
        expandBtn.classList.toggle("todo-row__expand-btn--open")
    });
    editBtn.addEventListener("click", () => {
        observer.publish("editTodo", todo.id);
    });

    function toggleExpanded() {
        expanded.hidden = !expanded.hidden;
    }

    return display;
}
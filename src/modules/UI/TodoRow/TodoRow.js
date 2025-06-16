import './TodoRow.css';

import trashIconSrc from '../../../img/trash_icon.svg';

import controller from '../../controller';
import createDOMElement from '../../createDOMElement.js';

export default function createTodoRow(todo) {
    const description = createDOMElement('div', { class: 'todo-row__description' }, todo.description);
    const title = createDOMElement('div', { class: 'todo-row__title' }, todo.title);
    const priority = createDOMElement('div', { class: 'todo-row__priority' }, `P${todo.priority}`);
    const date = createDOMElement('div', { class: 'todo-row__date' }, todo.date)

    const trashIcon = createDOMElement('img', { 
        class: 'todo-row__trash-icon',
        src: trashIconSrc, 
        alt: 'trash icon'
    });
    const deleteBtn = createDOMElement('button', { class: 'todo-row__delete-btn'}, trashIcon);
    const expandBtn = createDOMElement('button', { class: 'todo-row__expand-btn' });

    const checkbox = createDOMElement('input', {
        class: 'todo-row__checkbox',
        type: 'checkbox',
    });
    checkbox.checked = todo.completed;
    // the checked attribute is weird. setAttribute (how createDOMElement 
    // adds attributes) doesn't work because the property is not 
    // 'reflective.' See: https://stackoverflow.com/a/57617754

    const expanded = createDOMElement('div', {
        class: 'todo-row__expanded',
        hidden: true,
    }, description);

    const main = createDOMElement('div', { 
        class: 'todo-row__main' 
    }, checkbox, expandBtn, title, priority, date, deleteBtn);

    const display = createDOMElement('div', {
        class: 'todo-row',
    }, main, expanded)

    if (todo.priority >= 1 && todo.priority <= 4) {
        display.classList.add(`todo-row--p${todo.priority}`);
    }

    deleteBtn.addEventListener('click', () => controller.removeTodo(todo.id));
    checkbox.addEventListener('click', () => todo.toggleCompleted());
    expandBtn.addEventListener('click', () => {
        toggleExpanded()
        expandBtn.classList.toggle('todo-row__expand-btn--open')
    });

    function toggleExpanded() {
        expanded.hidden = !expanded.hidden;
    }

    return display;
}
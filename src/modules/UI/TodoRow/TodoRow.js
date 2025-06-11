import './TodoRow.css';

import controller from '../../controller';
import createDOMElement from '../../createDOMElement.js';

export default function createTodoRow(todo) {
    const description = createDOMElement('div', { class: 'todo-row__description' }, todo.description);
    const title = createDOMElement('div', { class: 'todo-row__title' }, todo.title);
    const priority = createDOMElement('div', { class: 'todo-row__priority' }, `P${todo.priority}`);
    const date = createDOMElement('div', { class: 'todo-row__date' }, todo.date)

    const deleteBtn = createDOMElement('button', {}, 'x');
    const expandBtn = createDOMElement('button', {}, '>');

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

    deleteBtn.addEventListener('click', () => controller.removeTodo(todo.id));
    checkbox.addEventListener('click', () => todo.toggleCompleted());
    expandBtn.addEventListener('click', () => {
        toggleExpanded()
        expandBtn.textContent = expandBtn.textContent === '>' ? 'V' : '>'    
    });

    function toggleExpanded() {
        expanded.hidden = !expanded.hidden;
    }

    return display;
}
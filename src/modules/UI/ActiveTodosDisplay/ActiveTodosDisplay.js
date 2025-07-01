import './ActiveTodosDisplay.css';

import { subscribe } from "../../observer.js";
import { getActiveTodos } from "../../controller.js";
import createTodoRow from '../TodoRow/TodoRow.js';
import { createDOMElement } from '../../domManipulators.js';

export default function createActiveTodoDisplay() {
    const display = createDOMElement('div', { class: 'todo-display' });
    
    subscribe('activeTodosUpdate', render);

    function render() {
        display.textContent = '';
        const todos = getActiveTodos();

        const todoDisplays = todos.map(todo => {
            const todoRow = createTodoRow(todo);
            return todoRow;
        })

        todoDisplays.forEach(todoDisplay => {
            display.append(todoDisplay);
        });
    }
    
    return display;
}

 
import './ActiveTodos.css';

import { subscribe } from "../../observer.js";
import { getActiveTodos } from "../../controller.js";

export default function createActiveTodoDisplay() {

    const display = document.createElement('div');
    display.classList.add('todo-display')
    
    function render() {
        display.textContent = '';
        const todos = getActiveTodos();

        const todoDisplays = todos.map(todo => {
            const todoDisplay = document.createElement('div');
            todoDisplay.classList.add('todo-display__item')

            todoDisplay.textContent = `completed: ${todo.completed} |
                                       title: ${todo.title} | 
                                       description: ${todo.description} | 
                                       priority: ${todo.priority} | 
                                       date: ${todo.date} | 
                                       projectId: ${todo.projectId}`;
            return todoDisplay;
        })

        todoDisplays.forEach(todoDisplay => {
            display.append(todoDisplay);
        });
    }

    subscribe('activeTodosUpdate', render);
    
    return {
        display,
    }
}

 
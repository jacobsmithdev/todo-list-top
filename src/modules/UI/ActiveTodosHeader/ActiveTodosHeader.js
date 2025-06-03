import './ActiveTodosHeader.css';

import { subscribe } from "../../observer.js";
import controller from "../../controller.js";

export default function createActiveTodosHeader() {
    const display = document.createElement('div');
    display.classList.add('todos-header');

    const header = document.createElement('h2');
    header.classList.add('todos-header__header');

    const description = document.createElement('p');
    description.classList.add('todos-header__description');

    display.append(header, description);

    function render() {
        const activeQuery = controller.getActiveQuery();

        if (!activeQuery) return;

        header.textContent = activeQuery.title;
        description.textContent = activeQuery.description;
    }

    render();

    subscribe('activeTodosUpdate', render);
    
    return display;
}

 
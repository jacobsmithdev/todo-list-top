import './ActiveTodosHeader.css';

import { subscribe } from "../../observer.js";
import controller from "../../controller.js";

export default function createActiveTodosHeader() {
    const header = document.createElement('h2');
    header.classList.add('todos-header__header');

    const description = document.createElement('p');
    description.classList.add('todos-header__description');

    const display = document.createElement('div');
    display.classList.add('todos-header');
    display.append(header, description);

    subscribe('activeTodosUpdate', render);

    function render() {
        const activeQuery = controller.getActiveQuery();

        if (!activeQuery) return;

        header.textContent = activeQuery.title;
        description.textContent = activeQuery.description;
    }

    render();

    return display;
}

 
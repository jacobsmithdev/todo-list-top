import './ActiveTodosHeader.css';

import { subscribe } from "../../observer.js";
import controller from "../../controller.js";
import createDOMElement from '../../createDOMElement.js';

export default function createActiveTodosHeader() {
    const header = createDOMElement('h2', { class: 'todos-header__header' });
    const description = createDOMElement('p', { class: 'todos-header__description' });

    const display = createDOMElement('div', {
        class: 'todos-header',
    }, header, description);

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

 
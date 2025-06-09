import './ProjectsDisplay.css';

import controller from '../../controller.js';
import { subscribe } from '../../observer.js';
import createDOMElement from '../../createDOMElement.js';

export default function createProjectsDisplay() {
    const display = createDOMElement('div', {
        class: 'projects-display',
    })

    subscribe('projectUpdate', render);

    render();

    function render() {
        display.textContent = '';
        const projects = controller.getAllProjects();
        const projectBtns = projects.map(project => {
            const btn = createDOMElement('button', { class: 'list-btn' }, project.title);

            btn.addEventListener('click', () => {
                controller.setActiveQuery(project);
            });
            
            return btn;
        })

        display.append(...projectBtns);
    }

    return display;
}
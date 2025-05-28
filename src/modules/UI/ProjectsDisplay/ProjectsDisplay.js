import './ProjectsDisplay.css';
import controller from '../../controller.js';
import { subscribe } from '../../observer.js';

export default function createProjectsDisplay() {
    const display = document.createElement('div')
    display.classList.add('projects-display')

    function render() {
        display.textContent = '';
        const projects = controller.getAllProjects();
        const projectBtns = projects.map(project => {
            const btn = document.createElement('button');
            btn.textContent = project.title;
            btn.addEventListener('click', () => {
                controller.setActiveQuery(project);
            });
            return btn;
        })

        display.append(...projectBtns);
    }

    render();

    subscribe('projectUpdate', render);

    return {
        display,
    }
}
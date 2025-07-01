import './ProjectRow.css';

import trashIconSrc from '../../../img/trash_icon.svg';

import controller from '../../controller';
import { createDOMElement }  from '../../domManipulators.js';

export default function createProjectRow(project) {
    
    const trashIcon = createDOMElement('img', { 
        class: 'project-row__trash-icon',
        src: trashIconSrc, 
        alt: 'trash icon',
    });

    const title = createDOMElement('button', { class: 'project-row__title' }, project.title);

    const deleteBtn = createDOMElement('button', { class: 'project-row__delete-btn' }, trashIcon);
    const display = createDOMElement('div', { class: 'project-row' }, title, deleteBtn);

    display.addEventListener('click', (event) => {
        if (event.target === deleteBtn || event.target === trashIcon) {
            controller.removeProject(project.id);
        } else {
            controller.setActiveQuery(project);
        }
    });

    return display;
}
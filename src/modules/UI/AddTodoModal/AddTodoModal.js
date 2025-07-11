import './AddTodoModal.css';

import controller from '../../controller.js';
import { subscribe } from '../../observer.js';
import { createDOMElement, createFormInput, createFormSelectInput, createOption }  from '../../domManipulators.js';

export default function createAddTodoModal() {
    const title = createFormInput('text', 'title', 'title', 'Title', 'title');
    const description = createFormInput('text', 'description', 'description', 'Description', 'description');
    const priority = createFormInput('number', 'priority', 'priority', 'Priority', 'priority');
    const date = createFormInput('datetime-local', 'date', 'date', 'Date', 'date');

    const titleInput = title.querySelector('input');
    const descriptionInput = description.querySelector('input');
    const priorityInput = priority.querySelector('input');
    const dateInput = date.querySelector('input');

    const openBtn = createDOMElement('button', { class: 'list-btn' }, '+ Add Todo');
    const submitBtn = createDOMElement('button', { class: 'form-submit-btn' }, '+ Add');
    const closeBtn = createDOMElement('button', { type: 'button', class: 'form-close-btn' }, 'close');

    const projectsData = controller.getAllProjects();
    const projectsOptionData = projectsData.map(project => ({ name: project.title, value: project.id, disabled: false }));
    // Add option for inbox
    projectsOptionData.unshift({ name: 'Inbox', value: '', disabled: false });

    const project = createFormSelectInput('project', 'project', 'Project', projectsOptionData, 0);
    const projectInput = project.querySelector('select#project');

    const form = createDOMElement('form', {
        class: 'modal__form',
    }, closeBtn, title, description, priority, date, project, submitBtn)

    const modal = createDOMElement('dialog', { class: 'modal' }, form);

    const display = modal;

    openBtn.addEventListener('click', () => modal.showModal());
    closeBtn.addEventListener('click', () => modal.close());
   
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        controller.addTodo(
            titleInput.value,
            descriptionInput.value,
            dateInput.value,
            priorityInput.value,
            false,
            projectInput.value || null,
        )

        form.reset();
        modal.close();
    });

    subscribe('projectUpdate', render);

    function render() {
        const projects = controller.getAllProjects();
        const projectsOptionData = projects.map(project => ({ name: project.title, value: project.id, disabled: false }));

        // Add option for inbox
        projectsOptionData.unshift({ name: 'Inbox', value: '', disabled: false });

        const projectsOptions = projectsOptionData.map(optionData => createOption(optionData));
        projectInput.textContent = '';
        projectInput.append(...projectsOptions);
    }

    return [
        display,
        openBtn,
    ]
}
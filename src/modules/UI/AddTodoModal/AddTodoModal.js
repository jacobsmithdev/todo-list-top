import './AddTodoModal.css';

import controller from '../../controller.js';
import { subscribe } from '../../observer.js';
import { createDOMElement, createFormInput }  from '../../domManipulators.js';

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

    let project = createProjectSelect('project', 'project', 'select project...');

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
            project.value || null,
        )

        form.reset();
        modal.close();
    });

    subscribe('projectUpdate', render);

    function render() {
        const newProjects = createProjectSelect('project', 'project', 'project');
        project.replaceWith(newProjects);
        project = newProjects;
    }

    return [
        display,
        openBtn,
    ]
}

function createProjectSelect(id, name, description) {
    const placeholder = createDOMElement('option', {
        class: 'select__option',
        disabled: true,
        selected: true,
        value: '',
    }, description);

    const select = createDOMElement('select', {
        class: 'select',
        id: id,
        name: name,
    }, placeholder);

    const projectsData = controller.getAllProjects();

    projectsData.forEach(project => {
        const option = createDOMElement('option', {
            class: 'select__option',
            value: (project.id)
        }, project.title);

        select.append(option);
    });

    return select;
}
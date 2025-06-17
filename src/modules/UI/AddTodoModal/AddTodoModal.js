import './AddTodoModal.css';

import controller from '../../controller.js';
import { subscribe } from '../../observer.js';
import createDOMElement from '../../createDOMElement.js';

export default function createAddTodoModal() {
    const title = createFormInput('text', 'title', 'title', 'Title', 'title');
    const description = createFormInput('text', 'description', 'description', 'Description', 'description');
    const priority = createFormInput('number', 'priority', 'priority', 'Priority', 'priority');
    const date = createFormInput('date', 'date', 'date', 'Date', 'date');

    const openBtn = createDOMElement('button', { class: 'list-btn' }, '+ Add Todo');
    const submitBtn = createDOMElement('button', { class: 'form-submit-btn' }, '+ Add');
    const closeBtn = createDOMElement('button', { type: 'button', class: 'form-close-btn' }, 'close');

    let project = createFormSelect('project', 'project', 'select project...');

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
            title.querySelector('input').value,
            description.querySelector('input').value,
            date.querySelector('input').value,
            priority.querySelector('input').value,
            false,
            project.value || null,
        )

        form.reset();
        modal.close();
    });

    subscribe('projectUpdate', render);

    function render() {
        const newProjects = createFormSelect('project', 'project', 'project');
        project.replaceWith(newProjects);
        project = newProjects;
    }

    return [
        display,
        openBtn,
    ]
}

function createFormSelect(id, name, description) {
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

function createFormInput(type, id, name, description, placeholder) {
    const input = createInput(type, id, name, placeholder)
    const label = createLabel(input, description)
    
    const row = createDOMElement('div', { class: 'form-row' }, label, input);

    return row;
}

function createLabel(input, text) {
    const inputId = input.getAttribute('id');

    const label = createDOMElement('label', {
        class: 'form-row__label',
        for: inputId,
    }, text);

    return label;
}

function createInput(type, id, name, placeholder) {
    const input = createDOMElement('input', {
        class: 'form-row__input',
        type: type,
        id: id,
        name: name,
        placeholder: placeholder,
    });

    return input;
}
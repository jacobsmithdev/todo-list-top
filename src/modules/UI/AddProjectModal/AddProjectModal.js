import './AddProjectModal.css';

import controller from '../../controller.js';

export default function createAddProjectModal() {
    const openBtn = document.createElement('button');
    openBtn.textContent = '+ Add Project';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'close';
    closeBtn.setAttribute('type', 'button');

    const title = createFormInput('text', 'title', 'title', 'Title', 'title');
    
    const description = createFormInput('text', 'description', 'description', 'Description', 'description');

    const submitBtn = document.createElement('button');
    submitBtn.textContent = '+ Add';
    
    const form = document.createElement('form');
    form.classList.add('project-modal__form');
    form.append(closeBtn, title, description, submitBtn);
   
    const modal = document.createElement('dialog');
    modal.classList.add('project-modal');
    modal.append(form);

    const display = modal;

    openBtn.addEventListener('click', () => modal.showModal());
    closeBtn.addEventListener('click', () => modal.close());
   
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        controller.addProject(
            title.querySelector('input').value,
            description.querySelector('input').value,
        )

        form.reset();
        modal.close();
    });

    return [
        display,
        openBtn,
    ]
}

function createFormInput(type, id, name, description, placeholder) {
    const input = createInput(type, id, name, placeholder)
    const label = createLabel(input, description)

    const row = document.createElement('div');
    row.classList.add('form-row');
    row.append(label, input);
    return row;
}

function createLabel(input, text) {
    const label = document.createElement('label');
    label.classList.add('form-row__label');
    label.textContent = text;
    label.setAttribute('for', input.getAttribute('id'))

    return label;
}

function createInput(type, id, name, placeholder) {
    const input = document.createElement('input');
    input.classList.add('form-row__input');
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('name', name);
    input.setAttribute('placeholder', placeholder);

    return input;
}
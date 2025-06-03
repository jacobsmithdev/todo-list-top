import './AddProjectModal.css';
import controller from '../../controller.js';

export default function createAddProjectModal() {
    const modal = document.createElement('dialog');
    const form = document.createElement('form');

    modal.classList.add('project-modal');
    form.classList.add('project-modal__form');

    modal.append(form);
    const display = modal;

    const openBtn = document.createElement('button');
    openBtn.textContent = '+ Add Project';
    openBtn.addEventListener('click', () => modal.showModal());

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'close';
    closeBtn.setAttribute('type', 'button');
    closeBtn.addEventListener('click', () => modal.close());

    const submitBtn = document.createElement('button');
    submitBtn.textContent = '+ Add';

    const title = createFormInput('text', 'title', 'title', 'Title', 'title');
    const description = createFormInput('text', 'description', 'description', 'Description', 'description');

    form.append(closeBtn, title, description, submitBtn);

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
    const row = document.createElement('div');
    const input = createInput(type, id, name, placeholder)
    const label = createLabel(input, description)

    row.classList.add('form-row');

    row.append(label, input);
    return row;
}

function createLabel(input, text) {
    const label = document.createElement('label');

    label.setAttribute('for', input.getAttribute('id'))
    label.textContent = text;

    label.classList.add('form-row__label');

    return label;
}

function createInput(type, id, name, placeholder) {
    const input = document.createElement('input');

    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('name', name);
    input.setAttribute('placeholder', placeholder);

    input.classList.add('form-row__input');

    return input;
}
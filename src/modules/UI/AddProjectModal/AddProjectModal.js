import './AddProjectModal.css';

import controller from '../../controller.js';
import createDOMElement from '../../createDOMElement.js';

export default function createAddProjectModal() {
    const title = createFormInput('text', 'title', 'title', 'Title', 'title');
    const description = createFormInput('text', 'description', 'description', 'Description', 'description');
    
    const submitBtn = createDOMElement('button', { class: 'form-submit-btn' }, '+ Add');
    const openBtn = createDOMElement('button', { class: 'list-btn' }, '+ Add Project')
    const closeBtn = createDOMElement('button', { type: 'button', class: 'form-close-btn' }, 'close');

    const form = createDOMElement('form', {
        class: 'modal__form',
    }, closeBtn, title, description, submitBtn);
   
    const modal = createDOMElement('dialog', { class: 'modal' }, form);
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
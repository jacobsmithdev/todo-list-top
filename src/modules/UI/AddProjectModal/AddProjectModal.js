import './AddProjectModal.css';

import controller from '../../controller.js';
import { createDOMElement, createFormInput }  from '../../domManipulators.js';

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
import './AddTodoModal.css';
import controller from '../../controller.js';
import { subscribe } from '../../observer.js';

export default function createAddTodoModal() {
    const modal = document.createElement('dialog');
    const form = document.createElement('form');

    modal.classList.add('modal');
    form.classList.add('modal__form');

    modal.append(form);
    const display = modal;

    const openBtn = document.createElement('button');
    openBtn.textContent = '+ Add Todo';
    openBtn.addEventListener('click', () => modal.showModal());

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'close';
    closeBtn.setAttribute('type', 'button');
    closeBtn.addEventListener('click', () => modal.close());

    const submitBtn = document.createElement('button');
    submitBtn.textContent = '+ Add';

    const title = createFormInput('text', 'title', 'title', 'Title', 'title');
    const description = createFormInput('text', 'description', 'description', 'Description', 'description');
    const priority = createFormInput('number', 'priority', 'priority', 'Priority', 'priority');
    const date = createFormInput('date', 'date', 'date', 'Date', 'date');

    let project = createFormSelect('project', 'project', 'select project...');

    function render() {
        const newProjects = createFormSelect('project', 'project', 'project');
        project.replaceWith(newProjects);
        project = newProjects;
    }

    form.append(closeBtn, title, description, priority, date, project, submitBtn);

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

    return [
        display,
        openBtn,
    ]
}

function createFormSelect(id, name, description) {
    const select = document.createElement('select');
    
    select.setAttribute('id', id);
    select.setAttribute('name', name);

    const placeholder = document.createElement('option');
    placeholder.textContent = description;
    placeholder.setAttribute('disabled', true)
    placeholder.setAttribute('selected', true)
    placeholder.setAttribute('value', '');
    
    select.append(placeholder);
    const projectsData = controller.getAllProjects();

    projectsData.forEach(project => {
        const option = document.createElement('option');
        option.textContent = project.title;
        option.setAttribute('value', project.id);
        select.append(option);
    });

    return select;
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
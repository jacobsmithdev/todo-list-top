import './TodoRow.css';

import controller from '../../controller';

export default function createTodoRow(todo) {
    const description = document.createElement('div');
    description.classList.add('todo-row__description')
    description.textContent = todo.description;

    const title = document.createElement('div');
    title.classList.add('todo-row__title');
    title.textContent = todo.title;

    const priority = document.createElement('div');
    priority.classList.add('todo-row__priority');
    priority.textContent = `priority: ${todo.priority} | ${todo.id}`;

    const date = document.createElement('div');
    date.classList.add('todo-row__date');
    date.textContent = todo.date;

    const project = document.createElement('div');
    project.classList.add('todo-row__project');
    project.textContent = todo.projectId;

    const checkbox = document.createElement('input');
    checkbox.classList.add('todo-row__checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.completed;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'x';

    const expandBtn = document.createElement('button');
    expandBtn.textContent = '>';

    const main = document.createElement('div');
    main.classList.add('todo-row__main');
    main.append(checkbox, expandBtn, title, priority, date, project, deleteBtn);

    const expanded = document.createElement('div');
    expanded.classList.add('todo-row__expanded');
    expanded.hidden = true;
    expanded.append(description);
    
    const display = document.createElement('div');
    display.classList.add('todo-row');
    display.append(main, expanded);

    deleteBtn.addEventListener('click', () => controller.removeTodo(todo.id));
    checkbox.addEventListener('click', () => todo.toggleCompleted());
    expandBtn.addEventListener('click', () => {
        toggleExpanded()
        expandBtn.textContent = expandBtn.textContent === '>' ? 'V' : '>'    
    });

    function toggleExpanded() {
        expanded.hidden = !expanded.hidden;
    }

    return display;
}
import controller from '../../controller';
import './TodoRow.css';

export default function createTodoRow(todo) {
    const display = document.createElement('div');
    const main = document.createElement('div');

    const expanded = document.createElement('div')
    const description = document.createElement('div');
    
    const checkbox = document.createElement('input');
    const title = document.createElement('div');
    const priority = document.createElement('div');
    const date = document.createElement('div');
    const project = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const expandBtn = document.createElement('button');
    
    display.classList.add('todo-row')
    main.classList.add('todo-row__main')

    expanded.classList.add('todo-row__expanded')
    description.classList.add('todo-row__expanded')

    checkbox.classList.add('todo-row__checkbox');
    title.classList.add('todo-row__title');
    priority.classList.add('todo-row__priority');
    date.classList.add('todo-row__date');
    project.classList.add('todo-row__project');
    
    checkbox.setAttribute('type', 'checkbox');

    title.textContent = todo.title;
    priority.textContent = `priority: ${todo.priority} | ${todo.id}`;
    date.textContent = todo.date;
    project.textContent = todo.projectId;
    deleteBtn.textContent = 'x';
    expandBtn.textContent = '>';

    description.textContent = todo.description;

    expanded.hidden = true;
    checkbox.value = todo.completed;
    
    deleteBtn.addEventListener('click', () => controller.removeTodo(todo.id));
    checkbox.addEventListener('click', () => todo.toggleCompleted());
    expandBtn.addEventListener('click', () => {
        toggleExpanded()
        expandBtn.textContent = expandBtn.textContent === '>' ? 'V' : '>'    
    });

    function toggleExpanded() {
        expanded.hidden = !expanded.hidden;
    }

    main.append(checkbox, expandBtn, title, priority, date, project, deleteBtn);
    expanded.append(description);

    display.append(main, expanded);

    return {
        display,
    }
}
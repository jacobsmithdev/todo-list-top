import './reset.css';
import './index.css';

import controller from "./modules/controller.js";
import observer from "./modules/observer.js";
import testData from "./modules/testData.js";
import TodoQuery from "./modules/classes/TodoQuery.js";
import createActiveTodoDisplay from './modules/UI/ActiveTodos/ActiveTodos.js';
import createAddTodoModal from './modules/UI/AddTodoModal/AddTodoModal.js';
import createProjectsDisplay from './modules/UI/ProjectsDisplay/ProjectsDisplay.js';


const activeTodosContainer = document.querySelector('#todos');
const activeTodosDisplay = createActiveTodoDisplay();
activeTodosContainer.append(activeTodosDisplay.display);

const [projects, todos] = testData.createProjectArray(5);
projects.forEach(project => controller.addProject(project));
todos.forEach(todo => controller.addTodo(todo));


const AddTodoModalContainer = document.querySelector('.todos-nav');
const AddTodoModal = createAddTodoModal();
document.body.append(AddTodoModal.display);
AddTodoModalContainer.append(AddTodoModal.openBtn);

const ProjectsDisplayContainer = document.querySelector('.projects-nav');
const ProjectsDisplay = createProjectsDisplay();
ProjectsDisplayContainer.append(ProjectsDisplay.display);

window.controller = controller;
window.observer = observer;
window.testData = testData;
window.TodoQuery = TodoQuery;

observer.subscribe('todoQuery', () => {
    console.log('todoQuery');
})

observer.subscribe('todoUpdate', () => {
    console.log('todoUpdate');
})

observer.subscribe('projectQuery', () => {
    console.log('projectQuery');
})

observer.subscribe('projectUpdate', () => {
    console.log('projectUpdate');
})

observer.subscribe('activeQueryUpdate', () => {
    console.log('activeQueryUpdate');
})

observer.subscribe('activeTodosUpdate', () => {
    console.log('activeTodosUpdate');
})

controller.setActiveQuery(projects[0]);

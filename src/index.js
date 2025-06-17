import './fonts.css';
import './reset.css';
import './colors.css';
import './index.css';

import controller from "./modules/controller.js";
import observer from "./modules/observer.js";
import testData from "./modules/testData.js";
import TodoQuery from "./modules/classes/TodoQuery.js";

import createActiveTodoDisplay from './modules/UI/ActiveTodosDisplay/ActiveTodosDisplay.js';
import createActiveTodosHeader from './modules/UI/ActiveTodosHeader/ActiveTodosHeader.js';
import createInboxBtn from './modules/UI/InboxBtn/InboxBtn.js';
import createProjectsDisplay from './modules/UI/ProjectsDisplay/ProjectsDisplay.js';
import createAddTodoModal from './modules/UI/AddTodoModal/AddTodoModal.js';
import createAddProjectModal from './modules/UI/AddProjectModal/AddProjectModal.js';

// Containers
const activeTodosContainer = document.querySelector('#todos');
const activeTodosHeaderContainer = document.querySelector('#todos-header');
const todosNav = document.querySelector('.todos-nav');
const projectsNav = document.querySelector('.projects-nav');

// UI Components
const activeTodosDisplay = createActiveTodoDisplay();
const activeTodosHeader = createActiveTodosHeader();
const inboxBtn = createInboxBtn();
const projectsDisplay = createProjectsDisplay();
const [addTodoModal, addTodoModalBtn] = createAddTodoModal();
const [addProjectModal, addProjectModalBtn] = createAddProjectModal();

// Appends
activeTodosContainer.append(activeTodosDisplay);
activeTodosHeaderContainer.append(activeTodosHeader);
todosNav.append(addTodoModalBtn, inboxBtn);
projectsNav.append(addProjectModalBtn, projectsDisplay);
document.body.append(addTodoModal, addProjectModal);

const [projects, todos] = testData.createProjectArray(5);
projects.forEach(project => controller.addProject(project));
todos.forEach(todo => controller.addTodo(todo));

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

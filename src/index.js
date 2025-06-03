import './reset.css';
import './index.css';

import controller from "./modules/controller.js";
import observer from "./modules/observer.js";
import testData from "./modules/testData.js";
import TodoQuery from "./modules/classes/TodoQuery.js";
import createActiveTodoDisplay from './modules/UI/ActiveTodosDisplay/ActiveTodosDisplay.js';
import createAddTodoModal from './modules/UI/AddTodoModal/AddTodoModal.js';
import createProjectsDisplay from './modules/UI/ProjectsDisplay/ProjectsDisplay.js';
import createActiveTodosHeader from './modules/UI/ActiveTodosHeader/ActiveTodosHeader.js';
import createAddProjectModal from './modules/UI/AddProjectModal/AddProjectModal.js';
import createInboxBtn from './modules/UI/InboxBtn/InboxBtn.js';

const activeTodosContainer = document.querySelector('#todos');
const activeTodosDisplay = createActiveTodoDisplay();
activeTodosContainer.append(activeTodosDisplay);

const activeTodosHeaderContainer = document.querySelector('#todos-header');
const activeTodosHeader = createActiveTodosHeader();
activeTodosHeaderContainer.append(activeTodosHeader);

const AddTodoModalContainer = document.querySelector('.todos-nav');
const [AddTodoModal, AddTodoModalBtn] = createAddTodoModal();
document.body.append(AddTodoModal);
AddTodoModalContainer.append(AddTodoModalBtn);

const ProjectsDisplayContainer = document.querySelector('.projects-nav');
const ProjectsDisplay = createProjectsDisplay();
ProjectsDisplayContainer.append(ProjectsDisplay);

const [AddProjectModal, AddProjectModalBtn] = createAddProjectModal();
document.body.append(AddProjectModal);
ProjectsDisplayContainer.append(AddProjectModalBtn);

const InboxBtn = createInboxBtn();
AddTodoModalContainer.append(InboxBtn);

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

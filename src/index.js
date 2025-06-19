import './fonts.css';
import './reset.css';
import './colors.css';
import './index.css';

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

import debug from './debug.js';
debug();
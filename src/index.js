import './reset.css';
import './index.css';

import controller from "./modules/controller";
import observer from "./modules/observer.js";
import testData from "./modules/testData.js";
import TodoQuery from "./modules/classes/TodoQuery.js";

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
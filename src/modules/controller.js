import database from "./database.js";
import observer from "./observer.js";

function queryTodos(query) {
    observer.publish('todoQuery');
    return database.todos.query(query);
}

function getAllTodos() {
    observer.publish('todoQuery');
    return database.todos.items;
}

function addTodo(...args) {
    const todo = database.todos.create(...args);
    observer.publish('todoUpdate');
    return todo;
}

function removeTodo(id) {
    const removedTodo = database.todos.delete(id);
    observer.publish('todoUpdate');
    return removedTodo;
}

function queryProjects(query) {
    observer.publish('projectQuery');
    return database.projects.query(query);
}

function getAllProjects() {
    observer.publish('projectQuery');
    return database.projects.items;
}

function addProject(...args) {
    const project = database.projects.create(...args);
    observer.publish('projectUpdate');
    return project;
}

function removeProject(id) {
    const removedProject = database.projects.delete(id);
    const removedProjectTodos = database.todos.query(todo => todo.projectId === id);
    removedProjectTodos.forEach(todo => removeTodo(todo.id));
    observer.publish('projectUpdate');
    return [removedProject, removedProjectTodos];
}

export default {
    queryTodos,
    getAllTodos,
    addTodo,
    removeTodo,
    queryProjects,
    getAllProjects,
    addProject,
    removeProject,
}

export {
    queryTodos,
    getAllTodos,
    addTodo,
    removeTodo,
    queryProjects,
    getAllProjects,
    addProject,
    removeProject,
}
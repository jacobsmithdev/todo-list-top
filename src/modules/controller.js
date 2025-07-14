import database from "./database.js";
import observer from "./observer.js";
import TodoQuery from "./classes/TodoQuery.js";
import Project from "./classes/Project.js";

let activeQuery = null;
let activeTodos = [];

function setActiveQuery(input) {
    if (input instanceof TodoQuery) {
        const query = input;
        activeQuery = query;
        updateActiveTodos();
        observer.publish('activeQueryUpdate');
        return true;
    }

    // If a project is passed in, create a query
    // to get all todos corresponding to that project
    if (input instanceof Project) {
        const project = input;
        const queryFn = todo => todo.projectId === project.id;
        activeQuery = new TodoQuery(queryFn, project.title, project.description, project.id);
        updateActiveTodos();
        observer.publish('activeQueryUpdate');
        return true;
    }
    return false;
}

function getActiveQuery() {
    return activeQuery;
}

function updateActiveTodos() {
    if (activeQuery) {
        activeTodos = database.todos.query(activeQuery.query);
    }
    observer.publish('activeTodosUpdate');
}

function getActiveTodos() {
    return activeTodos;
}

function queryTodos(query) {
    observer.publish('todoQuery');
    return database.todos.query(query);
}

function getTodo(id) {
    observer.publish('todoQuery');
    return database.todos.read(id);
}

function getAllTodos() {
    observer.publish('todoQuery');
    return database.todos.items;
}

function addTodo(...args) {
    const todo = database.todos.create(...args);
    if (activeQuery && activeQuery.query(todo)) {
        updateActiveTodos();
    }
    observer.publish('todoUpdate');
    return todo;
}

function removeTodo(id) {
    const removedTodo = database.todos.delete(id);
    if (activeQuery && activeQuery.query(removedTodo)) {
        updateActiveTodos();
    }
    observer.publish('todoUpdate');
    return removedTodo;
}

function editTodo(id, field, value) {
    const todo = database.todos.read(id);
    if (todo) {
        database.todos.update(id, field, value);
        updateActiveTodos();
    }

    observer.publish('todoUpdate');
    return todo;
}

function toggleTodoCompleted(id) {
    const todo = database.todos.read(id);
    todo.toggleCompleted();
    observer.publish('todoUpdate');
    return todo;
}

function queryProjects(query) {
    observer.publish('projectQuery');
    return database.projects.query(query);
}

function getProject(id) {
    observer.publish('projectQuery');
    return database.projects.read(id);
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
    getTodo,
    getAllTodos,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodoCompleted,
    queryProjects,
    getProject,
    getAllProjects,
    addProject,
    removeProject,
    getActiveTodos,
    getActiveQuery,
    setActiveQuery,
}

export {
    queryTodos,
    getTodo,
    getAllTodos,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodoCompleted,
    queryProjects,
    getProject,
    getAllProjects,
    addProject,
    removeProject,
    getActiveTodos,
    getActiveQuery,
    setActiveQuery,
}
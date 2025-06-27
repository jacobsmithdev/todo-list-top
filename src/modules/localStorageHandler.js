import Todo from "./classes/Todo";
import Project from "./classes/Project";

import observer from "./observer";
import controller from "./controller";

function saveTodos() {
   const todosJSON = JSON.stringify(controller.getAllTodos());
   localStorage.setItem('todos', todosJSON);
}

function getTodos() {
   const todosLocalStorage = localStorage.getItem('todos');
   if (todosLocalStorage === null) return null;

   const todosJSON = JSON.parse(todosLocalStorage);

   const todos = todosJSON.map(todoObj => {
      // Create Todo objects from json values so we can access Todo methods
      return makeClassInstance(todoObj, Todo);
   });

   return todos;
}

function saveProjects() {
   const projectsJSON = JSON.stringify(controller.getAllProjects())
   localStorage.setItem('projects', projectsJSON);
}

function getProjects() {
   const projectsLocalStorage = localStorage.getItem('projects');
   if (projectsLocalStorage === null) return null;

   const projectsJSON = JSON.parse(projectsLocalStorage);

   const projects = projectsJSON.map(projectJSONData => {
      // Create Project objects from json values so we can access Project methods      
      return makeClassInstance(projectJSONData, Project);
   });

   return projects;
}

function makeClassInstance(object, ClassType) {
   const objValues = Object.values(object);
   const classInstance = new ClassType(...objValues);
   return classInstance;
}

observer.subscribe('todoUpdate', () => saveTodos());
observer.subscribe('projectUpdate', () => saveProjects());

export {
   saveTodos,
   getTodos,
   saveProjects,
   getProjects,
};

export default {
   saveTodos,
   getTodos,
   saveProjects,
   getProjects,
};


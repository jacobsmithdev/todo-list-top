import controller from "./controller";
import localStorageHandler from "./localStorageHandler";

export default function loadLocalStorage() {
    const projectsStorage = localStorageHandler.getProjects();
    const todosStorage = localStorageHandler.getTodos();
    
    if (projectsStorage) {
        projectsStorage.forEach(project => {
            controller.addProject(project);
        });
    }
    
    if (todosStorage) {
        todosStorage.forEach(todo => {
            controller.addTodo(todo);
        })
    }
}
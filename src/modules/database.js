import Dataset from "./classes/Dataset.js";
import Todo from "./classes/Todo.js";
import Project from "./classes/Project.js";

const todos = new Dataset(Todo);
const projects = new Dataset(Project);

export default {
    todos,
    projects,
}

export {
    todos,
    projects,
}
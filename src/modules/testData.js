import Todo from "./classes/Todo.js";
import Project from "./classes/Project.js";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let todoCounter = 0;
let projectCounter = 0;

function generateRandomDate() {
    const today = new Date(Date.now());

    const year = String(today.getFullYear()).padStart(2, "0");

    // Months are zero based in date objects - increment to display "correct" month
    const month = String(today.getMonth() + 1).padStart(2, "0");

    const daysOffset = Math.floor(Math.random() * 7);
    const days = String(today.getDate() + daysOffset).padStart(2, "0");

    const hours = String(Math.floor(Math.random() * 23)).padStart(2, "0");

    const minutesMultiple = 5;
    const randomMinutes = Math.floor(Math.random() * 59);
    // Floor randomMinutes to the closest multiple of minutesMultiple
    const minutesAmount = Math.floor(randomMinutes / minutesMultiple) * minutesMultiple;
    const minutes = String(minutesAmount).padStart(2, "0");

    const dateString = `${year}-${month}-${days}T${hours}:${minutes}:00`;
    const randomDate = new Date(dateString);
    
    return randomDate;
}

function createTodo(projectId = null) {
    const title = `todo${todoCounter.toString().padStart(3, "0")}`;
    const description = getRandomString(10);
    const priority = Math.floor(Math.random() * 5) + 1;
    const completed = Math.random() < 0.5;
    const date = generateRandomDate();

    const todo = new Todo(title, description, date, priority, completed, projectId);
    todoCounter++;
    return todo;
}

function createTodoArray(numTodos, projectId = null) {
    const todos = [];
    for (let i = 0; i < numTodos; i++) {
        const todo = createTodo(projectId);
        todos.push(todo);
    }
    return todos;
}

function createProject(numTodos = 0) {
    const title = `project${projectCounter.toString().padStart(3, "0")}`;
    const description = getRandomString(10);

    const project = new Project(title, description);
    const projectTodos = createTodoArray(numTodos, project.id);
    
    projectCounter++;

    return [project, projectTodos];
}

function createProjectArray(numProjects) {
    const projects = [];
    const projectsTodos = [];
    for (let i = 0; i < numProjects; i++) {
        const numTodos = Math.floor(Math.random() * 10);
        const [project, todos] = createProject(numTodos);

        projects.push(project);
        todos.forEach(todo => projectsTodos.push(todo));
    }
    return [projects, projectsTodos];
}

function getRandomString(length) {
    let string = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * CHARS.length);
        const isLowercase = Math.random() < 0.5;

        let randomChar = CHARS[randomIndex];
        if (isLowercase) randomChar = randomChar.toLowerCase();
        
        string += randomChar;
    }
    return string;
}

export default {
    createTodo,
    createTodoArray,
    createProject,
    createProjectArray,
}

export {
    createTodo,
    createTodoArray,
    createProject,
    createProjectArray,
}
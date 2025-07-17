import "./TestProjectsBtn.css";

import controller from "../../controller.js";
import { createDOMElement }  from "../../domManipulators.js";
import testData from "../../testData.js";
import observer from "../../observer.js";

export default function createTestProjectsBtn() {
    const display = createDOMElement("button", {
        class: "test-data-btn list-btn",
    }, "+ Load Test Projects");

    
    observer.subscribe('projectUpdate', () => {
        if (controller.getAllProjects().length === 0) {
            display.hidden = false;
        } else {
            display.hidden = true;
        }
    });

    display.addEventListener("click", () => {
        const [projects, todos] = testData.createProjectArray(5);
        projects.forEach(project => controller.addProject(project));
        todos.forEach(todo => controller.addTodo(todo));
    });

    return display;
}
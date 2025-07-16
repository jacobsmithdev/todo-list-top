import "./ProjectsDisplay.css";

import controller from "../../controller.js";
import { subscribe } from "../../observer.js";
import { createDOMElement }  from "../../domManipulators.js";
import createProjectRow from "../ProjectRow/ProjectRow.js";

export default function createProjectsDisplay() {
    const display = createDOMElement("div", {
        class: "projects-display",
    })

    subscribe("projectUpdate", render);

    function render() {
        display.textContent = "";
        const projects = controller.getAllProjects();
        const projectBtns = projects.map(project => createProjectRow(project));

        display.append(...projectBtns);
    }

    return display;
}
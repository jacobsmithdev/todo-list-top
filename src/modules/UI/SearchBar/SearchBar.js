import "./SearchBar.css";

import controller from "../../controller.js";
import { createDOMElement }  from "../../domManipulators.js";
import { format } from "date-fns";
import TodoQuery from "../../classes/TodoQuery.js";

export default function createSearchBar() {
    const display = createDOMElement("input", {
        type: "search",
        placeholder: "Search",
        class: "search-bar "
    })

    display.addEventListener("change", () =>{
        const queryFn = (todo) => {
            const searchValue = display.value.toLowerCase();
            const searchData = formatSearchData(todo);
            
            if (searchData.some(item => item.includes(searchValue))) {
                return true;
            }
            return false;
        }

        const query = new TodoQuery(queryFn, "", `searching for "${display.value}"`);
        controller.setActiveQuery(query);
    })

    return display;
}

function formatSearchData(todo) {
    const title = todo.title;
    const description = todo.description;
    const date = todo.date ? format(new Date(todo.date), "PPPPpppp") : "";

    const project = controller.getProject(todo.projectId);
    const projectName = project ? project.title : "inbox";
    const projectDescription = project ? project.description : "inbox";

    const dataArr = [
        title,
        description,
        date,
        projectName,
        projectDescription,
    ]

    const lowerCaseDataArr = dataArr.map(item => String(item).toLowerCase());

    return lowerCaseDataArr;
}
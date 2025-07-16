import "./TodayTodosBtn.css";

import controller from "../../controller.js";
import TodoQuery from "../../classes/TodoQuery.js";
import { createDOMElement }  from "../../domManipulators.js";
import { format, startOfDay, isEqual } from "date-fns";

export default function createTodayTodosBtn() {
    const display = createDOMElement("button", {
        class: "today-todos-btn list-btn",
    }, "Today");
    
    const queryFn = (todo) => {
        if (!todo.date) return false;
        
        const todoDate = new Date(todo.date);

        if (isToday(todoDate)) {
            return true;
        }
        return false;
    }

    const inboxQuery = new TodoQuery(
        queryFn,
        "Today",
        `${format(Date.now(), "MMM d, yyyy")}`
    );
    
    display.addEventListener("click", () => controller.setActiveQuery(inboxQuery))
    
    return display;
}

function isToday(date) {
    const currentDate = new Date(Date.now());
    return isEqual(startOfDay(currentDate), startOfDay(date));
}
 
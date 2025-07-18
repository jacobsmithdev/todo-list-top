import "./InboxBtn.css";

import controller from "../../controller.js";
import TodoQuery from "../../classes/TodoQuery.js";
import { createDOMElement }  from "../../domManipulators.js";

export default function createInboxBtn() {
    const display = createDOMElement("button", {
        class: "inbox-btn list-btn",
    }, "Inbox");

    const inboxQuery = new TodoQuery(
        todo => !todo.projectId,
        "Inbox",
        "todos without a project"
    );
    
    display.addEventListener("click", () => controller.setActiveQuery(inboxQuery))
    
    return display;
}

 
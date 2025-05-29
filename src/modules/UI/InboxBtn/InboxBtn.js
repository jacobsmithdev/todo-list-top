import './InboxBtn.css';

import controller from "../../controller.js";
import TodoQuery from "../../classes/TodoQuery.js";

export default function createInboxBtn() {
    const display = document.createElement('button');
    display.classList.add('inbox-btn');
    display.textContent = 'Inbox';

    const inboxQuery = new TodoQuery(
        todo => !todo.projectId,
        'Inbox',
        'todos without a project'
    );
    display.addEventListener('click', () => controller.setActiveQuery(inboxQuery))
    
    return {
        display,
    }
}

 
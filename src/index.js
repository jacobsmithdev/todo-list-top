import "./fonts.css";
import "./reset.css";
import "./colors.css";
import "./index.css";

import { setActiveQuery } from "./modules/controller.js";
import TodoQuery from "./modules/classes/TodoQuery.js";

import createActiveTodoDisplay from "./modules/UI/ActiveTodosDisplay/ActiveTodosDisplay.js";
import createActiveTodosHeader from "./modules/UI/ActiveTodosHeader/ActiveTodosHeader.js";
import createInboxBtn from "./modules/UI/InboxBtn/InboxBtn.js";
import createProjectsDisplay from "./modules/UI/ProjectsDisplay/ProjectsDisplay.js";
import createAddTodoModal from "./modules/UI/AddTodoModal/AddTodoModal.js";
import createAddProjectModal from "./modules/UI/AddProjectModal/AddProjectModal.js";
import createEditTodoModal from "./modules/UI/EditTodoModal/EditTodoModal.js";
import createTodayTodosBtn from "./modules/UI/TodayTodosBtn/TodayTodosBtn.js";
import loadLocalStorage from "./modules/loadLocalStorage.js";
import createSearchBar from "./modules/UI/SearchBar/SearchBar.js";
import createTestProjectsBtn from "./modules/UI/TestProjectsBtn/TestProjectsBtn.js";

// Containers
const activeTodosContainer = document.querySelector("#todos");
const activeTodosHeaderContainer = document.querySelector("#todos-header");
const searchBarContainer = document.querySelector("#search-bar-container");
const todosNav = document.querySelector(".todos-nav");
const projectsNav = document.querySelector(".projects-nav");

// UI Components
const activeTodosDisplay = createActiveTodoDisplay();
const activeTodosHeader = createActiveTodosHeader();
const inboxBtn = createInboxBtn();
const todayTodosBtn = createTodayTodosBtn();
const projectsDisplay = createProjectsDisplay();
const [addTodoModal, addTodoModalBtn] = createAddTodoModal();
const [addProjectModal, addProjectModalBtn] = createAddProjectModal();
const editTodoModal = createEditTodoModal();
const searchBar = createSearchBar();
const testProjectsBtn = createTestProjectsBtn();

// Appends
activeTodosContainer.append(activeTodosDisplay);
activeTodosHeaderContainer.append(activeTodosHeader);
searchBarContainer.append(searchBar)
todosNav.append(addTodoModalBtn, todayTodosBtn, inboxBtn);
projectsNav.append(addProjectModalBtn, projectsDisplay, testProjectsBtn);
document.body.append(addTodoModal, addProjectModal, editTodoModal);

loadLocalStorage();

setActiveQuery(
    new TodoQuery(
        todo => !todo.projectId,
        "Inbox",
        "todos without a project"
    )
);

export default class Todo {
    #id = crypto.randomUUID();

    constructor(title, description, date, priority, completed, projectId) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.completed = completed;
        this.projectId = projectId;
    }

    get id() {
        return this.#id;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}
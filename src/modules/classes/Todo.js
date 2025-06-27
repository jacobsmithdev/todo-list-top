export default class Todo {
    #id = null;

    constructor(title, description, date, priority, completed, projectId, id = crypto.randomUUID()) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.completed = completed;
        this.projectId = projectId;
        this.id = id;
    }

    get id() {
        return this.#id;
    }

    set id(newId) {
        if (!this.#id) this.#id = newId;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    toJSON() {
        return {
            title: (this.title),
            description: (this.description),
            date: (this.date),
            priority: (this.priority),
            completed: (this.completed),
            projectId: (this.projectId),
            id: (this.id),
        }
    }
}
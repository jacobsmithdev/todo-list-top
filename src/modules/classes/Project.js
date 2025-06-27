export default class Project {
    #id = null;

    constructor(title, description, id = crypto.randomUUID()) {
        this.title = title;
        this.description = description;
        this.id = id;
    }

    get id() {
        return this.#id;
    }

    set id(newId) {
        if (!this.#id) this.#id = newId;
    }

    toJSON() {
        return {
            title: (this.title),
            description: (this.description),
            id: (this.id),
        }
    }
}
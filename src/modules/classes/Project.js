export default class Project {
    #id = crypto.randomUUID();

    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    get id() {
        return this.#id;
    }
}
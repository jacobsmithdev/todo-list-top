export default class Dataset {
    #items;
    #DataType;

    constructor(Datatype, items = []) {
        this.#DataType = Datatype;
        this.#items = items;
    }

    get items() {
        return this.#items;
    }

    get DataType() {
        return this.#DataType;
    }

    create(...args) {
        // If a full object of the correct type is passed in, 
        // push it instead of creating one from scratch
        if (args[0] instanceof this.DataType) {
            const item = args[0];
            this.#items.push(item)
            return item;
        }

        const item = new this.DataType(...args);
        this.#items.push(item);
        return item;
    }

    read(id) {
        const item = this.#items.find(item => item.id === id);
        if (item) return item;
        return null;
    }

    update(id, field, value) {
        const item = this.read(id);
        item[field] = value;
        return item;
    }

    delete(id) {
        const itemIndex = this.#items.findIndex(item => item.id === id);
    
        // findIndex() returns -1 when it can't find an item, which 
        // splice() treats as a valid, negative index. To prevent the 
        // last array item from being removed, check if index is valid 
        // before calling splice().
        const isValidIndex = itemIndex > -1;
        if (isValidIndex) {
            const deletedItem = this.#items[itemIndex];
            this.#items.splice(itemIndex, 1);
            return deletedItem;
        };
        return null;
    }

    query(queryFn) {
        return this.#items.filter(item => queryFn(item));
    }
}
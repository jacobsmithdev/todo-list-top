const events = {};

function subscribe(event, callback) {
    if (!events[event]) events[event] = [];
    events[event].push(callback);
}

function unsubscribe(event, callback) {
    events[event].forEach((fn, index) => {
        if (fn === callback) {
            events[event].splice(index, 1);
        }
    });
}

function publish(event, data) {
    if (!events[event]) return;
    events[event].forEach(fn => fn(data));
}

export default {
    subscribe,
    unsubscribe,
    publish,
}

export {
    subscribe,
    unsubscribe,
    publish,
}
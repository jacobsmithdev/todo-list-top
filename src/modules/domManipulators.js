function isStandardElement(element) {
    return element instanceof HTMLElement
        && !(element instanceof HTMLUnknownElement);
}

function createDOMElement(tagName, HTML_attributes = {}, ...content) {
    const element = document.createElement(tagName);

    if (!isStandardElement(element))
        console.warn(tagName + " is not a standard tag name.");

    for (const attribute in HTML_attributes)
        element.setAttribute(attribute, HTML_attributes[attribute]);

    if (content)
        element.append(...content);

    return element;
}

function createFormInput(type, id, name, description, placeholder) {
    const input = createInput(type, id, name, placeholder)
    const label = createLabel(input, description)
    
    const row = createDOMElement('div', { class: 'form-row' }, label, input);

    return row;
}

function createLabel(input, text) {
    const inputId = input.getAttribute('id');

    const label = createDOMElement('label', {
        class: 'form-row__label',
        for: inputId,
    }, text);

    return label;
}

function createInput(type, id, name, placeholder) {
    const input = createDOMElement('input', {
        class: 'form-row__input',
        type: type,
        id: id,
        name: name,
        placeholder: placeholder,
    });

    return input;
}

export default {
    createDOMElement,
    createFormInput,
}

export {
    createDOMElement,
    createFormInput,
}
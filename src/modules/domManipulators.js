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
    
    const row = createDOMElement("div", { class: "form-row" }, label, input);

    return row;
}

function createLabel(input, text) {
    const inputId = input.getAttribute("id");

    const label = createDOMElement("label", {
        class: "form-row__label",
        for: inputId,
    }, text);

    return label;
}

function createInput(type, id, name, placeholder) {
    const input = createDOMElement("input", {
        class: "form-row__input",
        type: type,
        id: id,
        name: name,
        placeholder: placeholder,
    });

    return input;
}

function createFormSelectInput(id, name, description, optionsData, defaultOptionIndex = 0) {
    const select = createSelectInput(id, name, optionsData, defaultOptionIndex);
    const label = createLabel(select, description);

    const row = createDOMElement("div", { class: "form-row" }, label, select);

    return row;
}

// Requires optionsData to be an array of objects matching the 
// format for createOption"s input
function createSelectInput(id, name, optionsData, defaultOptionIndex = 0) {
    const select = createDOMElement("select", {
        id: id,
        name: name,
        class: "select"
    });

    if (optionsData) {
        const options = optionsData.map(optionData => createOption(optionData));
        const selectedOption = options.splice(defaultOptionIndex, 1)[0];
        select.append(selectedOption);
        select.append(...options);
    }

    return select;
}

// Requires an object matching the format:
// {
//     name: "name",
//     value: "value",
//     disabled: true/false,
// }
function createOption(optionData) {
    const textContent = optionData.name;
    const value = optionData.value;
    const disabled = optionData.disabled;

    const option = createDOMElement("option", { 
        value: value, 
        class: "select__option" 
    }, textContent);
    
    if (disabled) option.setAttribute("disabled", true);
    
    return option;
}

export default {
    createDOMElement,
    createFormInput,
    createFormSelectInput,
    createOption,
}

export {
    createDOMElement,
    createFormInput,
    createFormSelectInput,
    createOption,
}
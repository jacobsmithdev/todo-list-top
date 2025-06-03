function isStandardElement(element) {
    return element instanceof HTMLElement
        && !(element instanceof HTMLUnknownElement);
}

export default function createDOMElement(tagName, HTML_attributes = {}, ...content) {
    const element = document.createElement(tagName);

    if (!isStandardElement(element))
        console.warn(tagName + " is not a standard tag name.");

    for (const attribute in HTML_attributes)
        element.setAttribute(attribute, HTML_attributes[attribute]);

    if (content)
        element.append(...content);

    return element;
}
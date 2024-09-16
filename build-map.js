const containerMap = document.getElementById('map_area')
function createBox(index) {
    const box = document.createElement('div')
    box.classList.add('grid-item')
    box.id = `${index}-box`;
    box.addEventListener('click', () => handleClickBox(box));
    return box
}

// Click handler for buttons
function handleClickBox(box) {
    removeBoxSelectClass();
    box.classList.add("box-select");
}

// Function to remove 'text-select' class from all buttons
function removeBoxSelectClass() {
    const boxes = document.querySelectorAll(".grid-item");
    boxes.forEach(box => box.classList.remove("box-select"));
}


// Append buttons and spans to the container
function populateBoxArea() {
    const fragment = document.createDocumentFragment();
    [...Array(96)].forEach((_, index) => {
        const element = createBox(index)
        fragment.appendChild(element);
    });
    containerMap.appendChild(fragment); // Only append once

}

// Call the function to populate the text area
populateBoxArea();
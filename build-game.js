const buttons = document.querySelectorAll('.func-btn'); // Select all small buttons

// Loop through the buttons and add event listeners dynamically
buttons.forEach(button => {
    const func = button.id.split('-')[1]; // Extracts the 'walk', 'jump', etc. from the button ID
    button.addEventListener('click', () => clickFuncButton(func));
});

function clickFuncButton(func) {
    // Find selected text
    const text = document.querySelector(".text-select");
    if (!text) {
        console.warn("No text selected");
        return; // Exit if no text is selected
    }
    text.classList.remove("text-select");
    text.classList.add("text-disable")
    text.disabled = true

    // Find selected box
    const box = document.querySelector(".box-select");
    if (!box) {
        console.warn("No box selected");
        return; // Exit if no box is selected
    }

    box.innerText = text.innerText;    // Set box content to text content
    box.classList.add(func);           // Add the relevant class (walk, jump, etc.)
    box.classList.remove("box-select");// Remove the 'box-select' class
}
const text = `I met a traveller from an antique land,
    Who said—“Two vast and trunkless legs of stone
    Stand in the desert. . . . Near them, on the sand,
    Half sunk a shattered visage lies, whose frown,
    And wrinkled lip, and sneer of cold command,
    Tell that its sculptor well those passions read
    Which yet survive, stamped on these lifeless things,
    The hand that mocked them, and the heart that fed;
    And on the pedestal, these words appear:
    My name is Ozymandias, King of Kings;
    Look on my Works, ye Mighty, and despair!
    Nothing beside remains. Round the decay
    Of that colossal Wreck, boundless and bare
    The lone and level sands stretch far away.”`;

const wordsAndPunctuation = text.split(/(\b\w+\b)/g).filter(Boolean)

const container = document.getElementById('text_area');

// Function to handle button creation
function createButton(item, index) {
    const button = document.createElement('button');
    button.innerText = item;
    button.id = `${index}-${item}`;
    button.classList.add('text-button');
    button.addEventListener('click', () => handleClickText(button));
    return button;
}

// Function to handle span creation
function createSpan(item) {
    const span = document.createElement('span');
    span.innerText = item;
    return span;
}

// Click handler for buttons
function handleClickText(button) {
    removeTextSelectClass();
    button.classList.add("text-select");
}

// Function to remove 'text-select' class from all buttons
function removeTextSelectClass() {
    const buttons = document.querySelectorAll(".text-button");
    buttons.forEach(button => button.classList.remove("text-select"));
}

// Append buttons and spans to the container
function populateTextArea(wordsAndPunctuation) {
    const fragment = document.createDocumentFragment();
    wordsAndPunctuation.forEach((item, index) => {
        const element = /^\w+$/.test(item) ? createButton(item, index) : createSpan(item);
        fragment.appendChild(element);
    });
    container.appendChild(fragment); // Only append once

}

// Call the function to populate the text area
populateTextArea(wordsAndPunctuation);

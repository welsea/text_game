const containerMap = document.getElementById('map_area')
const selectWord= []
const selectBox=[]
function createBox(index) {
    const box = document.createElement('div')
    box.classList.add('grid-item')
    box.id = `${index+1}`;
    if(index+1 === 133) {
        box.innerText = 'START'
        box.style.backgroundColor= 'white'
        box.style.color="#a3caa3"
        box.style.borderBottom="3px dashed #a3caa3"
    }
    if(index+1 ===12){
        box.innerText = 'FINISH'
        box.style.backgroundColor= 'white'
        box.style.color="#a3caa3"
        box.style.borderRight="3px dashed #a3caa3"
    }
    box.addEventListener('click', () => handleClickBox(box));
    box.addEventListener('dblclick',()=> handleDoubleClickBox(box))
    return box
}

// Click handler for buttons
function handleClickBox(box) {
    if(box.classList.length<=1){
        // no overwrite
        removeBoxSelectClass();
        if(box.id!=='12' && box.id !== '133') box.classList.add("box-select");
        else window.alert('Please select other place to put your platform :)')
    }
}

function handleDoubleClickBox(box){
    // remove func and make word enable again

    if(box.innerText != '' ){
        box.className='grid-item'
        let index=selectBox.findIndex(item=>item===box.id)
        console.log(index)
        if(index!=-1){
            let textID=selectWord[index]
            let wordElement=document.getElementById(textID)
            wordElement.classList.remove('text-disable')
            wordElement.disabled=false
            selectWord.splice(index,1)
            selectBox.splice(index,1)
            box.innerText=''
            console.log(selectWord)
        }
    }
}

// Function to remove 'text-select' class from all buttons
function removeBoxSelectClass() {
    const boxes = document.querySelectorAll(".grid-item");
    boxes.forEach(box => box.classList.remove("box-select"));
}


// Append buttons and spans to the container
function populateBoxArea() {
    const fragment = document.createDocumentFragment();
    [...Array(144)].forEach((_, index) => {
        const element = createBox(index)
        fragment.appendChild(element);
    });
    containerMap.appendChild(fragment); // Only append once

}

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
        window.alert("No text selected");
        return; // Exit if no text is selected
    }
    text.classList.remove("text-select");
    text.classList.add("text-disable")
    selectWord.push(text.id)
    text.disabled = true

    // Find selected box
    const box = document.querySelector(".box-select");
    if (!box) {
        window.alert("No box selected");
        return; // Exit if no box is selected
    }

    box.innerText = text.innerText;    // Set box content to text content
    box.classList.add(func);           // Add the relevant class (walk, jump, etc.)
    selectBox.push(box.id)
    box.classList.remove("box-select");// Remove the 'box-select' class
}

// Call the function to populate the text area
populateBoxArea();
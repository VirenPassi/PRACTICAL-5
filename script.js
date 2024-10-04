// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

// Uncheck the item
function changeToUnchecked(questionName) {
    const id = currentAnswer[questionName];
    const index = "[data-choice-id='" + id + "']";
    const Items = document.querySelectorAll(index);
    
    for (let item of Items) {
        if (item.dataset.questionId === questionName) {
            const image = item.querySelector('.checkbox');
            image.src = 'images/unchecked.png';
            item.style.backgroundColor = '#f4f4f4';
            item.style.opacity = '1'; // Reset opacity
        }
    }
}

// Change the opacity of unchosen images
function changeOpacity(question, itemNoChange) {
    const index = "[data-question-id='" + question + "']";
    const Items = document.querySelectorAll(index);
    
    for (let item of Items) {
        if (!(item === itemNoChange)) {
            item.style.opacity = '0.6'; // Lower opacity for unchosen options
        }
    }
}

// Refresh web page to re-do quiz
function refreshWeb() {
    document.location.href = "index.html";
}

// Lock answers and display result
function lockToAnswer() {
    if (currentAnswer['one'] && currentAnswer['two'] && currentAnswer['three']) {
        // Lock all event listeners
        for (let item of itemList) {
            item.removeEventListener('click', changeToChecked);
        }

        // Show the result
        let output = document.querySelector('.result');
        let outputTitle = document.querySelector('.result #result-title');
        let outputContent = document.querySelector('.result #result-contents');
        
        // Determine result based on answers
        if (currentAnswer['three'] === currentAnswer['two']) {
            outputTitle.innerHTML = "You got: " + RESULTS_MAP[currentAnswer['two']]['title'];
            outputContent.innerHTML = RESULTS_MAP[currentAnswer['two']]['contents'];
        } else {
            outputTitle.innerHTML = "You got: " + RESULTS_MAP[currentAnswer['one']]['title'];
            outputContent.innerHTML = RESULTS_MAP[currentAnswer['one']]['contents'];
        }
        
        output.style.display = 'block';

        // Restart button listener
        const restartBtn = document.querySelector('#restart-quiz');
        restartBtn.addEventListener('click', refreshWeb);
    }
}

// Change the item to the checked status
function changeToChecked(event) {
    const item = event.currentTarget;
    const image = item.querySelector('.checkbox');
    image.src = 'images/checked.png';
    item.style.backgroundColor = '#cfe3ff'; // Highlight the selected item
    item.style.opacity = '1';
    
    const questionPicked = item.dataset.questionId;
    
    // If an answer for this question has been picked, uncheck the previous
    if (currentAnswer[questionPicked]) {
        changeToUnchecked(questionPicked);
    }

    changeOpacity(questionPicked, item); // Lower opacity of other options
    currentAnswer[questionPicked] = item.dataset.choiceId; // Store answer
    lockToAnswer();
}

// MAIN FUNCTION
let currentAnswer = { // Store answers for three questions
    'one': '',
    'two': '',
    'three': ''
};

const itemList = document.querySelectorAll('.choice-grid div');
for (const item of itemList) {
    item.addEventListener('click', changeToChecked); // Add click listeners
}
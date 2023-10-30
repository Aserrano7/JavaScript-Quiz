var questions = [
    {
        title: "The condition of an if/else statement is enclosed within ______.",
        options: [
            { choice: 'Quotes', check: false },
            { choice: 'Curly Brackets', check: true },
            { choice: 'Parentheses', check: false },
            { choice: 'Square Brackets', check: false }
        ]
    },
    {
        title: "Commonly used data types do NOT include:",
        options: [
            { choice: 'strings', check: false },
            { choice: 'booleans', check: false },
            { choice: 'alerts', check: true },
            { choice: 'number', check: false }
        ]
    },
    {
        title: "Arrays in Javascript can be used to store ______.",
        options: [
            { choice: 'Number and Strings', check: false },
            { choice: 'Other Arrays', check: false },
            { choice: 'Booleans', check: false },
            { choice: 'All of the Above', check: true }
        ]
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        options: [
            { choice: 'Quotes', check: true },
            { choice: 'Curly Brackets', check: false },
            { choice: 'Commas', check: false },
            { choice: 'Parenthese', check: false }
        ]
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            { choice: 'Javascript', check: false },
            { choice: 'console.log', check: true },
            { choice: 'Terminal/Bash', check: false },
            { choice: 'For Loops', check: false }
        ]
    },
];



var timerEl = document.getElementById("timer");
var timeLeft = 75;
var timeStr;
var strBox = document.getElementById('start-box');
var questionBox = document.getElementById('question-box');
var allQuestions;
var questionIndex;
function startGame() {
    timeStr = setInterval(timer, 1000);
    strBox.classList.add('hide');
    allQuestions = [].concat(questions);
    questionIndex = 0;
    questionBox.classList.remove('hide');
    timer();
    
}
function timer() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
}
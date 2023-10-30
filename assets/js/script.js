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
var questionTitle = document.getElementById('title');
var answBtn = document.getElementById('answer-buttons');
var checkAnswer = document.getElementById('checkAnswer');
var nextBtn = document.getElementById('next-button');
var highscoreList = JSON.parse(localStorage.getItem("highscoreList")) || [];
var submit = document.getElementById('submit-button');
var scoreForm = document.getElementById('score-form');
var initialUser = document.getElementById('initials-box');
var highscore = document.getElementById('highscores-box');

document.getElementById('start-button').addEventListener('click', startGame);

nextBtn.addEventListener('click', () => {
    questionIndex++;
    nextQuestion();
});

document.getElementById('score-link').addEventListener('click', displayHighscore);

submit.addEventListener('click', function (event) {
    event.preventDefault();
    var initialUser = document.getElementById('initials-box').value;
    displayHighscore(initialUser);
});
document.getElementById('restart-quiz').addEventListener('click', function (event) {
    location.reload();

});

document.getElementById('clear-button').addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});

function startGame() {
    timeStr = setInterval(timer, 1000);
    strBox.classList.add('hide');
    allQuestions = [].concat(questions);
    questionIndex = 0;
    questionBox.classList.remove('hide');
    timer();
    nextQuestion();

}
function timer() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        displayScore();
    }
};
function nextQuestion() {
    reset();
    displayQuestion(allQuestions[questionIndex]);
};
function reset() {
    nextBtn.classList.add("hide");
    checkAnswer.classList.add("hide");
    while (answBtn.firstChild) {
        answBtn.removeChild(answBtn.firstChild);
    }
};


function displayQuestion(question) {
    question.options.forEach(selected => {
        var button = document.createElement('button');
        button.innerText = selected.choice;
        button.classList.add('button');
        if (selected.check) {
            button.dataset.check = selected.check;
        }
        questionTitle.innerText = question.title;
        answBtn.appendChild(button);
        button.addEventListener('click', selectChoice);
    });

};
function selectChoice(event) {
    var selectedBtn = event.target;
    var correct = selectedBtn.dataset.check;
    checkAnswer.classList.remove("hide")
    if (correct) {
        checkAnswer.innerHTML = 'correct';
        checkAnswer.style.color = 'green'
    } else {
        checkAnswer.innerHTML = 'wrong';
        checkAnswer.style.color = 'red';
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            timeLeft -= 10;
        }
    }
    if (allQuestions.length > questionIndex + 1) {
        nextBtn.classList.remove("hide")
        checkAnswer.classList.remove("hide")
    } else {
        displayScore();
    }
}

function displayScore() {
    clearInterval(timeStr);
    timerEl.textContent = 'Time: ' + timeLeft;
    questionBox.classList.add('hide');
    var scoreBox = document.getElementById('score-box');
    scoreBox.classList.remove('hide');
    var playersScore = document.getElementById('players-score');
    playersScore.textContent = 'Your Score is ' + timeLeft;
}


function displayHighscore(initialUser) {
    highscore.classList.remove('hide');
    document.getElementById('score-box').classList.add('hide');
    strBox.classList.add('hide');
    questionBox.classList.add('hide');
    if (typeof initialUser == "string") {
        var scorelist = {
            initial: initialUser,
            score: timeLeft
        }
    }
    highscoreList.push(scorelist);
    var highscoreChart = document.getElementById('highscore');
    highscoreChart.innerHTML = "";
    var count = 1;
    for (let index = 0; index < highscoreList.length; index++) {
        var container1 = document.createElement('div');
        container1.setAttribute('class', "border list");
        container1.innerText = count + '. ' + highscoreList[index].initial + ' - ' + highscoreList[index].score;
        container1.style.textTransform = "uppercase";
        count++;
        highscoreChart.appendChild(container1);
    }
    localStorage.setItem('highscoreList', JSON.stringify(highscoreList));
};


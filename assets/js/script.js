// This array  will hold all my questions and answers
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


//These are all my declared variables that you can use globaly
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

//listens for start button to be presed and calls startGame funtion
document.getElementById('start-button').addEventListener('click', startGame);
//listens for next button to be pressed and if so increases question index and call next question
nextBtn.addEventListener('click', () => {
    questionIndex++;
    nextQuestion();
});

//listens for viewhighscore to be clicked if so calls display function
document.getElementById('score-link').addEventListener('click', displayHighscore);
//listens for submit button to be clicked if so calls the displayHighscore function with 
// the users initials in the parameters
submit.addEventListener('click', function (event) {
    event.preventDefault();
    var initialUser = document.getElementById('initials-box').value;
    displayHighscore(initialUser);
});

//listens for restart button to be clicked if so reloads the page
document.getElementById('restart-quiz').addEventListener('click', function (event) {
    location.reload();

});
//listens for clear button to be called if so clears localstorage and innerHTML
document.getElementById('clear-button').addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});
//starts the  time and hides everything besides the question box 
//and calls the nextQuestion function
function startGame() {
    timeStr = setInterval(timer, 1000);
    strBox.classList.add('hide');
    allQuestions = [].concat(questions);
    questionIndex = 0;
    questionBox.classList.remove('hide');
    timer();
    nextQuestion();

}
//sets our timer to subtract by 1 second and displays it on 
//header and if time reaches 0 then  display the players score
function timer() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        displayScore();
    }
};

//resets the page and uses different index to call the 
//displayQuestion function with the the new index 
function nextQuestion() {
    reset();
    displayQuestion(allQuestions[questionIndex]);
};

//resets the page so that the next button and the checkAnswer button is hidden using the 
//hide class, as well as removes all the buttons that were first created by 
//displayQuestion function
function reset() {
    nextBtn.classList.add("hide");
    checkAnswer.classList.add("hide");
    while (answBtn.firstChild) {
        answBtn.removeChild(answBtn.firstChild);
    }
};

//creates new buttons for all options from questions array 
//and makes the container for them and appends them to the
//page, running them trhough a for.each loop 
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
//checks what choice the user selected and checks if 
// is wrong or correct, while also subtracting 10 seconds
// from the timer if  the users chooses the wrong answer
//once time runs out or player reaches the end of the questions
//then it calls the function displayScore to show the players 
//score
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
//clears the timer and adds the hide class to everthing besides the score-box
//as well as displays the users time and their score
function displayScore() {
    clearInterval(timeStr);
    timerEl.textContent = 'Time: ' + timeLeft;
    questionBox.classList.add('hide');
    var scoreBox = document.getElementById('score-box');
    scoreBox.classList.remove('hide');
    var playersScore = document.getElementById('players-score');
    playersScore.textContent = 'Your Score is ' + timeLeft;
}

//this function uses the user initials to save their score 
//and initials to the local storage as well as storing them 
//in ther own div to display the users score. 
// it runs a for loop to attach this to every user that plays 
// the quiz
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


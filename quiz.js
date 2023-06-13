// Quiz questions array
var questions = [
  {
    question: "What is the correct syntax for referring to an external script called 'script.js'?",
    options: [
      "<script src='script.js'>",
      "<script href='script.js'>",
      "<script ref='script.js'>",
      "script name='script.js'>"
    ],
    answer: 0
  },
  {
    question: "Which built-in method calls a function for each element in the array?",
    options: [
      "while()",
      "loop()",
      "forEach()",
      "every()"
    ],
    answer: 2
  },
  {
    question: "Inside which HTML  element do we put the Javascript?",
    options: [
      "<js>",
      "<javascript>",
      "<script>",
      "<scripting>"
    ],
    answer: 2
  },
  {
    question: "How you write 'Hello World' in an alert box?",
    options: [
      "alertBox('Hello World');",
      "msgBox('Hello World');",
      "alert('Hello World');",
      "msg('Hello World');"
    ],
    answer: 2
  }
];

var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerInterval;

var startContainer = document.getElementById("start-container");
var startButton = document.getElementById("start-button");
var quizContainer = document.getElementById("quiz-container");
var questionNumber = document.getElementById("question-number");
var questionElement = document.getElementById("questions");
var optionsList = document.getElementById("options");
var timerElement = document.getElementById("time");
var scoreContainer = document.getElementById("score-container");
var finalScoreElement = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");

// Start the quiz function
function startQuiz() {
  startContainer.style.display = "none";
  quizContainer.style.display = "block";

// Quiz state to be reset
currentQuestionIndex = 0;
score = 0;
time = questions.length * 10;
timerElement.textContent = time;

// Question array to be shuffled
shuffleQuestions();

// To display first question
showQuestion();

// To start timer
startTimer();
}

// Shuffle questions
function shuffleQuestions() {
  for (var i = questions.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
}

// Start timer function
function startTimer() {
  timerInterval = setInterval(function () {
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
      endQuiz();
    }
  }, 100000);
}

// Display current question function
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var options = currentQuestion.options;

  questionNumber.textContent = "Question " + (currentQuestionIndex + 1) + " of " + questions.length;
  questionElement.textContent = currentQuestion.question;
  optionsList.innerHTML = "";

  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("li");
    option.textContent = options[i];
    optionsList.appendChild(option);
    option.addEventListener("click", checkAnswer);
  }
}

var score = 0;
var timeLeft = 0;

// Check selected answer
function checkAnswer(event) {
  var selectedOption = event.target;
  var currentQuestion = questions[currentQuestionIndex];

  var options = Array.from(optionsList.children);

  // Disable click events on all options to prevent multiple selections
  options.forEach(function (option) {
    option.removeEventListener("click", checkAnswer);
  });

  var isCorrect = currentQuestion.answer === Array.from(optionsList.children).indexOf(selectedOption);

  if (isCorrect) {
    score++;
    selectedOption.classList.add("correct"); // Add 'correct' class for correct answer
  } else {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerElement.textContent = time;
    selectedOption.classList.add ("wrong"); // Add 'wrong' class for incorrect answer
  }

  // Display 'Correct!' or 'Wrong!' for the selected answer
  var answerStatus = document.createElement("p");
  answerStatus.textContent = isCorrect ? "Correct!" : "Wrong!";
  answerStatus.classList.add("answer-status");
  quizContainer.appendChild(answerStatus);
  
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    setTimeout (function () {
      answerStatus.remove(); // remove answer status
      showQuestion(); // display next question
    }, 1000); // 1 second delay before next question
  } else {
      setTimeout(function () {
        answerStatus.remove(); // remove answer status
        endQuiz(); // end quiz
      }, 1000); // 1 second delay before ending quiz
  }
}


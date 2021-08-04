var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizQuestions = [
  {
    question:
      "Which pitcher led the majors in complete games in the 2000s (2000-2009)?",
    choiceA: "Roy Halladay",
    choiceB: "Justin Verlander",
    choiceC: "CC Sabathia",
    choiceD: "Cliff Lee",
    correctAnswer: "a",
  },
  {
    question: "Which American League team has the most World Series losses?",
    choiceA: "A's",
    choiceB: "Red Sox",
    choiceC: "Yankees",
    choiceD: "Tigers",
    correctAnswer: "c",
  },
  {
    question:
      "Which player has the most extra base hits in the history of World Series play?",
    choiceA: "Mickey Mantle",
    choiceB: "Yogi Berra",
    choiceC: "Bernie Williams",
    choiceD: "Bobby Richardson",
    correctAnswer: "a",
  },
  {
    question:
      "Which player has the most career home runs without ever winning an MVP award?",
    choiceA: "Eddy Murray",
    choiceB: "Jimmie Foxx",
    choiceC: "Hank Aaron",
    choiceD: "Jim Thome",
    correctAnswer: "d",
  },
  {
    question: "What pitcher holds the record for consecutive complete games?",
    choiceA: "Cy Young",
    choiceB: "Roger Clemens",
    choiceC: "Jack Taylor",
    choiceD: "Roy Halladay",
    correctAnswer: "c",
  },
  {
    question: "Which manager struck out in his first and only MLB at-bat?",
    choiceA: "Bobby Cox",
    choiceB: "Sparky Anderson",
    choiceC: "John McGraw",
    choiceD: "Walter Aston",
    correctAnswer: "d",
  },
  {
    question:
      "Which player is at third base in Abbott & Costello's Who's on First routine?",
    choiceA: "Who?",
    choiceB: "I don't know",
    choiceC: "What?",
    choiceD: "Tomorrow",
    correctAnswer: "b",
  },
];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 35;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion() {
  gameoverDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}

function startQuiz() {
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuizQuestion();

  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}

function showScore() {
  quizBody.style.display = "none";
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };

    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

function showHighscore() {
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

function replayQuiz() {
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 35;
  score = 0;
  currentQuestionIndex = 0;
}

function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert("That Is Correct!");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert("That Is Incorrect.");
    timeLeft -=5;
    currentQuestionIndex++;
    generateQuizQuestion();
  } else {
    showScore();
  }
}

startQuizButton.addEventListener("click", startQuiz);

const readline = require("readline");

// Question Bank
const questions = [
  {
    question: "What is the capital of Italy?",
    options: ["1. Florence", "2. Rome", "3. Venice", "4. Milan"],
    answer: 2,
  },
  {
    question: "Which planet is known as the 'Blue Planet'?",
    options: ["1. Mars", "2. Earth", "3. Neptune", "4. Saturn"],
    answer: 2,
  },
  {
    question: "What is the largest continent by area?",
    options: ["1. Africa", "2. Asia", "3. Europe", "4. Antarctica"],
    answer: 2,
  },
];

// Track game play
let score = 0;
let currentQuestionIndex = 0;
const questionTimeLimit = 10;
const totalQuizTimeLimit = 150;
let remainingQuizTime = totalQuizTimeLimit;
let quizTimer;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to handle asking questions asynchronously
async function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    return endQuiz();
  }

  const currentQuestion = questions[currentQuestionIndex];
  let timeLeft = questionTimeLimit;

  const displayQuestion = () => {
    process.stdout.write(`\n${currentQuestion.question} (${timeLeft}s left)\n`);
    currentQuestion.options.forEach((option) => console.log(option));
  };

  // Initial question display
  displayQuestion();

  // Countdown for the question timer
  const questionTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(questionTimer);
      console.log("\nTime's up! Moving to the next question...");
      currentQuestionIndex++;
      askQuestion(); // Proceed to next question
    }
  }, 1000);

  // Wait for user's input asynchronously
  const userAnswer = await new Promise((resolve) => {
    rl.question("\nYour answer: ", (answer) => {
      clearInterval(questionTimer);
      resolve(answer);
    });
  });

  const answerNum = parseInt(userAnswer);

  // Validate input
  if (
    isNaN(answerNum) ||
    answerNum < 1 ||
    answerNum > currentQuestion.options.length
  ) {
    console.log(
      "Invalid answer! Please enter a number corresponding to the options."
    );
    askQuestion(); // Retry question if invalid input
    return;
  }

  // Check the answer and give feedback
  if (answerNum === currentQuestion.answer) {
    console.log("Correct!");
    score++;
  } else {
    console.log(
      `Wrong answer! The correct answer is ${currentQuestion.answer}.`
    );
  }

  // Move to next question
  currentQuestionIndex++;
  askQuestion();
}

// Function to start the quiz
function startQuiz() {
  console.log("Quiz Started! You have limited time for each question.\n");

  // Countdown for total quiz time
  quizTimer = setInterval(() => {
    remainingQuizTime--;
    if (remainingQuizTime <= 0) {
      clearInterval(quizTimer);
      console.log("\nTime's up for the quiz!");
      endQuiz();
    }
  }, 1000);

  askQuestion();
}

// Function to end the quiz
function endQuiz() {
  clearInterval(quizTimer);
  rl.close();

  console.log(`\nQuiz over! Your score is: ${score}/${questions.length}`);

  // Determine pass and score
  const passPercentage = (score / questions.length) * 100;
  if (passPercentage >= 80) {
    console.log("Congratulations! You passed the quiz.");
  } else {
    console.log("Sorry, you did not pass the quiz.");
  }
}

// Start the quiz
startQuiz();

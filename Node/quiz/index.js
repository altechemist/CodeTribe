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
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["1. Gold", "2. Oxygen", "3. Silver", "4. Hydrogen"],
    answer: 2,
  },
  {
    question: "What is the main ingredient in sushi?",
    options: ["1. Chicken", "2. Rice", "3. Beef", "4. Fish"],
    answer: 2,
  },
  {
    question: "Who is known as the Father of Geometry?",
    options: ["1. Aristotle", "2. Euclid", "3. Pythagoras", "4. Newton"],
    answer: 2,
  },
  {
    question: "Which organ in the human body is responsible for pumping blood?",
    options: ["1. Brain", "2. Kidney", "3. Heart", "4. Lung"],
    answer: 3,
  },
  {
    question: "What is the currency of Japan?",
    options: ["1. Yen", "2. Won", "3. Dollar", "4. Peso"],
    answer: 1,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["1. Ruby", "2. Diamond", "3. Sapphire", "4. Emerald"],
    answer: 2,
  },
  {
    question: "Which ocean is the largest?",
    options: ["1. Atlantic", "2. Indian", "3. Arctic", "4. Pacific"],
    answer: 4,
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["1. Oxygen", "2. Nitrogen", "3. Carbon Dioxide", "4. Hydrogen"],
    answer: 3,
  },
  {
    question: "In which year did the Apollo 11 moon landing occur?",
    options: ["1. 1965", "2. 1969", "3. 1971", "4. 1975"],
    answer: 2,
  },
  {
    question: "What is the largest animal on Earth?",
    options: [
      "1. African Elephant",
      "2. Blue Whale",
      "3. Giraffe",
      "4. Great White Shark",
    ],
    answer: 2,
  },
  {
    question: "Who wrote '1984'?",
    options: [
      "1. Aldous Huxley",
      "2. George Orwell",
      "3. Ray Bradbury",
      "4. J.K. Rowling",
    ],
    answer: 2,
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["1. H2O", "2. O2", "3. CO2", "4. HO2"],
    answer: 1,
  },
];

// Track game play
let score = 0;
let currentQuestionIndex = 0;
const questionTimeLimit = 10;
const totalQuizTimeLimit = 150;
let remainingQuizTime = totalQuizTimeLimit;
let questionTimer, quizTimer;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  let timeLeft = questionTimeLimit;
  const currentQuestion = questions[currentQuestionIndex];

  const displayQuestion = () => {
    process.stdout.write(`\n${currentQuestion.question} ${timeLeft}s\r`);
    currentQuestion.options.forEach((option) => console.log(option));
  };

  displayQuestion();

  questionTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(questionTimer);
      console.log("\nTime's up! Moving to the next question...");
      currentQuestionIndex++;
      askQuestion();
    } else {
      displayQuestion();
    }
  }, 1000);

  rl.question("\nYour answer: ", (answer) => {
    clearInterval(questionTimer);
    const answerNum = parseInt(answer);

    // Validate input
    if (
      isNaN(answerNum) ||
      answerNum < 1 ||
      answerNum > currentQuestion.options.length
    ) {
      console.log(
        "Invalid answer! Please enter a number corresponding to the options."
      );
      askQuestion();
      return;
    }

    if (answerNum === currentQuestion.answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log(
        `Wrong answer! The correct answer is ${currentQuestion.answer}.`
      );
    }
    currentQuestionIndex++;
    askQuestion();
  });
}

function startQuiz() {
  console.log("Quiz Started! You have limited time for each question.\n");

  quizTimer = setInterval(() => {
    remainingQuizTime--;
    process.stdout.write(`Remaining total quiz time: ${remainingQuizTime}s\r`);
    if (remainingQuizTime <= 0) {
      clearInterval(quizTimer);
      console.log("\nTime's up for the quiz!");
      endQuiz();
    }
  }, 1000);

  askQuestion();
}

function endQuiz() {
  clearInterval(quizTimer);
  rl.close();
  console.log(`\nQuiz over! Your score is: ${score}/${questions.length}`);
}

startQuiz();

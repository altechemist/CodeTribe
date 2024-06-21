// MatchQuest - A Memory Game
// Find all matching pairs of cards by flipping them over two at a time.

// Initialize flip and move counts
flipCount = 0;
let flipCountDisplay = document.getElementById("moveCount");
flipCountDisplay.innerText = "Moves: " + flipCount;

matchesFound = 0;
let matchesFoundDisplay = document.getElementById("matchesDisplay");
matchesFoundDisplay.innerText = "Found: " + matchesFound + "/8";

moveCount = 0;

// Track last two flips
let prevMoves = [];

// Array of images (each image appears twice for matching pairs)
const images = [
  "./img/c-plus.png",
  "./img/c-plus.png",
  "./img/c-sharp.png",
  "./img/c-sharp.png",
  "./img/java.png",
  "./img/java.png",
  "./img/js.png",
  "./img/js.png",
  "./img/lisp.png",
  "./img/lisp.png",
  "./img/php.png",
  "./img/php.png",
  "./img/python.png",
  "./img/python.png",
  "./img/react.png",
  "./img/react.png",
];

// Shuffle the images array (optional)
shuffle(images);

// Create the game cards dynamically
images.forEach((filename, index) => {
  createCard(filename, index);
});

// Function to create a card element
function createCard(filename, id) {
  // Create a div element
  let div = document.createElement("div");
  div.classList.add("game-card");

  // Create an img element
  let img = document.createElement("img");
  img.setAttribute("class", "game-card");
  img.setAttribute("id", "game-card-" + id);
  img.setAttribute("src", "./img/question_mark.png");
  img.setAttribute("alt", filename);

  // Append the img element to the div element
  div.appendChild(img);

  // Append the div element to the game area
  const gameArea = document.querySelector("#game-area");
  gameArea.appendChild(div);
}

// Function to flip a card face up
function faceUp(index) {
  let gameCard = document.getElementById("game-card-" + index);
  gameCard.setAttribute("src", images[index]);
}

// Function to flip a card face down
function faceDown(index) {
  let gameCard = document.getElementById("game-card-" + index);
  gameCard.setAttribute("src", "./img/question_mark.png");
}

// Add event listeners to each card
for (let index = 0; index < images.length; index++) {
  let gameCard = document.getElementById("game-card-" + index);
  gameCard.addEventListener("click", (event) => {
    // Ensure only two cards are flipped at a time and not the same card twice
    if (prevMoves.length < 2 && !prevMoves.includes(index)) {
      // Flip the card face up
      gameCard.setAttribute("src", images[index]);

      // Track moves
      moveCount++;
      flipCount++;
      prevMoves.push(index);

      // Update screen
      flipCountDisplay.innerText = "Moves: " + flipCount;

      // Check if two cards are flipped
      if (moveCount === 2) {
        // Check if the two previous moves (cards) are the same
        if (images[prevMoves[0]] !== images[prevMoves[1]]) {
          // Cards do not match, flip them face down after a delay
          setTimeout(() => {
            faceDown(prevMoves[0]);
            faceDown(prevMoves[1]);
            // Clear moves
            prevMoves = [];
            moveCount = 0;
          }, 1000);
        } else {
          // Cards match, clear moves
          matchesFound++;
          matchesFoundDisplay.innerText = "Found: " + matchesFound + "/8";
          prevMoves = [];
          moveCount = 0;

          // Found all matches
          if (matchesFound === 8) {
            setTimeout(() => {
              alert("You have won");
              location.reload();
            }, 100);
          }
        }
      }
    }
  });
}

// Shuffle the images using Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

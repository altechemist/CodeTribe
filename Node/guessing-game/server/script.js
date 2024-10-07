const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D"];
let gameBoard = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Shuffle card values
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create cards on the game board
function createCards() {
  const shuffledValues = shuffle(cardValues);
  shuffledValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-value", value);
    card.innerText = "?";
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip the card
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");
  this.innerText = this.getAttribute("data-value");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }
}

// Check for a match
function checkForMatch() {
  const isMatch =
    firstCard.getAttribute("data-value") ===
    secondCard.getAttribute("data-value");

  if (isMatch) {
    disableCards();
    matchedPairs++;
    checkForWin();
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  resetBoard();
}

// Unflip cards if not a match
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    firstCard.innerText = "?";
    secondCard.classList.remove("flipped");
    secondCard.innerText = "?";

    resetBoard();
  }, 1000);
}

// Reset the board for the next turn
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Check for a win
function checkForWin() {
  if (matchedPairs === cardValues.length / 2) {
    document.getElementById("win-message").classList.remove("hidden");
  }
}

// Reset the game
document.getElementById("reset-button").addEventListener("click", () => {
  gameBoard.innerHTML = "";
  matchedPairs = 0;
  document.getElementById("win-message").classList.add("hidden");
  createCards(); // Create new cards
});

// Initialize the game
createCards();

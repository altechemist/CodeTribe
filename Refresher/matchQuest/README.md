# MatchQuest - A Memory Game

A classic card matching game implemented in JavaScript. The objective is to find all matching pairs of cards by flipping them over two at a time.

## Game Instructions

### Objective:
Find all the matching pairs of cards.

![image](https://github.com/altechemist/CodeTribe/assets/66011900/a6793879-6319-403a-98ea-368beccc5a22)


### Setup:
- The game board consists of 16 cards arranged in a 4x4 grid.
- Each card has a unique image, and there are 8 pairs of images in total.

### How to Play:
1. Click on any two cards to flip them over and reveal the images on their back sides.
2. If the images on the two flipped cards match, those cards will remain face up.
3. If the images do not match, the cards will flip back over to their face-down position after a short delay.
4. Continue flipping pairs of cards until all matching pairs have been found.

### Rules:
- Only two cards can be flipped at a time.
- If two flipped cards do not match, they will be flipped back over after 1 second.
- The game ends when all pairs have been successfully matched.

### Tips:
- Remember the positions and images of previously flipped cards to find matches more efficiently.
- Start by flipping over different pairs each time to gain more information about the card positions.

### Winning the Game:
You win the game when you have successfully matched all 8 pairs of cards, and all cards are face up.

## Technologies Used

- HTML
- CSS
- JavaScript

## Features

- Dynamic card creation and shuffling.
- Click event handling for flipping cards.
- Matching logic with visual feedback.
- Game completion detection.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please submit a pull request.

## Acknowledgments

- Inspired by the classic Memory Game.
- Built as a refresher task for DOM manipulation in JavaScript.
- Images sourced from: https://www.flaticon.com/

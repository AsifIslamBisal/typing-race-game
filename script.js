const carOne = document.getElementById('car-1');
const carTwo = document.getElementById('car-2');
const wordView = document.getElementById('word-to-type');
const wordInput = document.getElementById('type-word');
const modal = document.getElementById('modal');
const startGameBtn = document.getElementById('start-game');

let carOnePosition = 5;
let carTwoPosition = 5;
let isGameOver = false;
let startTime = null;
let wordCount = 0;
let currentWord = '';

const words = [
  "the", "quick", "brown", "fox", "jumps", "over",
  "lazy", "dog", "sun", "moon", "star", "tree",
  "river", "hill", "sky"
];

const setNewWord = () => {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordView.innerText = currentWord;
  wordInput.value = '';
};

const winner = (status) => {
  const elapsedTime = (Date.now() - startTime) / 1000 / 60; // মিনিটে রূপান্তর
  const wpm = Math.round(wordCount / elapsedTime);
  modal.innerHTML = `
    <h2>Game Over</h2>
    <h3>${status}</h3>
    <h3>Your WPM: ${wpm}</h3>
    <button onclick="playAgain()" class="btn">Play Again</button>
  `;
  modal.showModal();
};

wordInput.addEventListener('input', (e) => {
  if (isGameOver) return;
  if (e.target.value.trim() === currentWord) {
    wordCount++;
    carTwoPosition += 10;
    carTwo.style.left = carTwoPosition + '%';

    if (carTwoPosition >= 80) {
      isGameOver = true;
      winner('You win!');
    } else {
      setNewWord();
    }
  }
});

const carOneConstantMove = () => {
  const carOneMove = setInterval(() => {
    if (isGameOver) {
      clearInterval(carOneMove);
      return;
    }
    carOnePosition += 0.5;
    carOne.style.left = carOnePosition + '%';

    if (carOnePosition >= 80) {
      isGameOver = true;
      winner('You lost!');
    }
  }, 100);
};

const carTwoConstantMove = () => {
  const carTwoMove = setInterval(() => {
    if (isGameOver) {
      clearInterval(carTwoMove);
      return;
    }
    carTwoPosition += 0.1;
    carTwo.style.left = carTwoPosition + '%';

    if (carTwoPosition >= 80) {
      isGameOver = true;
      winner('You win!');
    }
  }, 100);
};

const startGame = () => {
  // Reset everything
  isGameOver = false;
  carOnePosition = 5;
  carTwoPosition = 5;
  wordCount = 0;
  startTime = Date.now();

  carOne.style.left = carOnePosition + '%';
  carTwo.style.left = carTwoPosition + '%';

  setNewWord();
  carOneConstantMove();
  carTwoConstantMove();
};

// Play Again Function
function playAgain() {
  modal.close();
  startGame();
}

startGameBtn.addEventListener('click', startGame);

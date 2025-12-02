const IMAGE_SRC = "images/puzzlegame.jpg";

const puzzleBoard = document.getElementById("puzzleBoard");
const difficultySelect = document.getElementById("difficulty");
const newGameBtn = document.getElementById("newGameBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves");
const statusMessage = document.getElementById("statusMessage");

let size;
let board = [];
let moves = 0;
let seconds = 0;
let timerInterval = null;
let selectedIndex = null;
let draggingFrom = null;

function initGame() {
  size = parseInt(difficultySelect.value);
  board = [...Array(size * size).keys()]; 
  shuffleBoard();
  renderBoard();
  resetStats();
  startTimer();
}

function resetStats() {
  moves = 0;
  seconds = 0;
  updateTimerDisplay();
  movesEl.textContent = moves;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  timerEl.textContent = `${m}:${s}`;
}

function shuffleBoard() {
  for (let i = board.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }
}

function renderBoard() {
  puzzleBoard.innerHTML = "";
  puzzleBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  puzzleBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const step = 100 / (size - 1);

  board.forEach((pieceIndex, position) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.index = position;

    const row = Math.floor(pieceIndex / size);
    const col = pieceIndex % size;

    tile.style.backgroundPosition = `${col * step}% ${row * step}%`;
    tile.style.backgroundSize = `${size * 100}% ${size * 100}%`;

    tile.addEventListener("click", handleClick);
    tile.addEventListener("dragstart", handleDragStart);
    tile.addEventListener("dragover", e => e.preventDefault());
    tile.addEventListener("drop", handleDrop);

    puzzleBoard.appendChild(tile);
  });
}

function handleClick(e) {
  const index = parseInt(e.target.dataset.index);

  if (selectedIndex === null) {
    selectedIndex = index;
    e.target.classList.add("selected");
  } else {
    swap(selectedIndex, index);
    selectedIndex = null;
  }
}

function handleDragStart(e) {
  draggingFrom = parseInt(e.target.dataset.index);
  e.dataTransfer.setData("text/plain", draggingFrom);
}

function handleDrop(e) {
  const to = parseInt(e.target.dataset.index);
  swap(draggingFrom, to);
}

function swap(a, b) {
  if (a === b) return;

  [board[a], board[b]] = [board[b], board[a]];
  moves++;
  movesEl.textContent = moves;

  renderBoard();

  if (isSolved()) {
    clearInterval(timerInterval);
    statusMessage.textContent = "🎉 You solved the puzzle!";
  } else {
    statusMessage.textContent = "";
  }
}

function isSolved() {
  return board.every((v, i) => v === i);
}

newGameBtn.addEventListener("click", initGame);
shuffleBtn.addEventListener("click", () => {
  shuffleBoard();
  renderBoard();
  moves = 0;
  movesEl.textContent = moves;
});

difficultySelect.addEventListener("change", initGame);

initGame();

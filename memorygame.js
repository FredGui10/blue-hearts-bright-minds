const grid = document.getElementById("memoryGrid");
const difficultySelect = document.getElementById("difficulty");
const restartBtn = document.getElementById("restartBtn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Base set of items
const baseItems = [
  "🐶","🐱","🐰","🦊","🐻","🐼",
  "🐸","🐵","🦁","🐯","🐮","🐨",
  "A","B","C","D","E","F",
  "1","2","3","4","5","6"
];

// Difficulty settings
const difficultyMap = {
  easy: 6,     // 3x4 grid = 6 pairs (12 cards)
  normal: 12,  // 4x6 grid = 12 pairs (24 cards)
  hard: 18     // 6x6 grid = 18 pairs (36 cards)
};

// -------------------------------
// BUILD GAME
// -------------------------------
function buildGame() {
  grid.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  const level = difficultySelect.value;
  const pairCount = difficultyMap[level];

  const items = baseItems.slice(0, pairCount);
  let cardValues = [...items, ...items];

  cardValues.sort(() => Math.random() - 0.5);

  cardValues.forEach(value => {
    const card = document.createElement("div");
    card.classList.add("memory-card");

    card.innerHTML = `
      <div class="card-front">${value}</div>
      <div class="card-back">?</div>
    `;

    grid.appendChild(card);
  });

  addCardListeners();
}

// -------------------------------
// CARD LOGIC
// -------------------------------
function addCardListeners() {
  document.querySelectorAll(".memory-card").forEach(card => {
    card.addEventListener("click", () => {
      if (lockBoard || card === firstCard) return;

      card.classList.add("flip");

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;

      if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard = null;
        secondCard = null;
        return;
      }

      lockBoard = true;

      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      }, 900);
    });
  });
}

// -------------------------------
// EVENT LISTENERS
// -------------------------------
difficultySelect.addEventListener("change", buildGame);
restartBtn.addEventListener("click", buildGame);

// Start first game
buildGame();

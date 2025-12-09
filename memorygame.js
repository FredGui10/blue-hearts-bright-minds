const grid = document.getElementById("memoryGrid");
const difficultySelect = document.getElementById("difficulty");
const restartBtn = document.getElementById("restartBtn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const baseItems = [
  "🐶","🐱","🐰","🦊","🐻","🐼",
  "🐸","🐵","🦁","🐯","🐮","🐨",
  "A","B","C","D","E","F",
  "1","2","3","4","5","6"
];

const difficultyMap = {
  easy: 6,
  normal: 12,
  hard: 18
};

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

difficultySelect.addEventListener("change", buildGame);
restartBtn.addEventListener("click", buildGame);

buildGame();

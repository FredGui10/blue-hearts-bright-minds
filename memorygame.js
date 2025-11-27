const grid = document.getElementById("memoryGrid");

const items = [
  "🐶","🐱","🐰","🦊","🐻","🐼",
  "🐸","🐵","🦁","🐯","🐮","🐨",
  "A","B","C","D","E","F",
  "1","2","3","4","5","6"
];

let cardValues = [...items, ...items];

cardValues.sort(() => 0.5 - Math.random());

cardValues.forEach(value => {
  const card = document.createElement("div");
  card.classList.add("memory-card");

  card.innerHTML = `
    <div class="card-front">${value}</div>
    <div class="card-back">?</div>
  `;

  grid.appendChild(card);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;

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

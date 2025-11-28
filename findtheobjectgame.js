const spots = document.querySelectorAll(".object-spot");
const labels = document.querySelectorAll(".object-label");
const counterText = document.querySelector(".found-counter");
const messageText = document.querySelector(".found-message");
const playAgainBtn = document.querySelector(".play-again-btn");

const objectsToFind = ["giraffe", "basketball", "pizza", "car", "backpack"];
let foundSet = new Set();

function updateCounter() {
  counterText.textContent = `Found ${foundSet.size} of ${objectsToFind.length} objects`;
}

function updateMessage(text, good) {
  messageText.textContent = text;
  if (good === true) {
    messageText.style.color = "var(--green)";
  } else if (good === false) {
    messageText.style.color = "var(--red)";
  } else {
    messageText.style.color = "#333";
  }
}

spots.forEach(spot => {
  spot.addEventListener("click", () => {
    const name = spot.dataset.name;
    if (foundSet.has(name)) return;

    foundSet.add(name);
    spot.classList.add("found");

    const label = document.querySelector(`.object-label[data-name="${name}"]`);
    if (label) label.classList.add("found-label");

    updateCounter();

    if (foundSet.size === objectsToFind.length) {
      updateMessage("Great job! You found all the objects!", true);
    } else {
      updateMessage("Nice! Keep going!", null);
    }
  });
});

playAgainBtn.addEventListener("click", () => {
  foundSet.clear();
  spots.forEach(spot => spot.classList.remove("found"));
  labels.forEach(label => label.classList.remove("found-label"));
  updateCounter();
  updateMessage("", null);
});

updateCounter();

const tabs = document.querySelectorAll(".shape-tab-btn");
const puzzles = document.querySelectorAll(".shape-puzzle");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    puzzles.forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    const target = btn.getAttribute("data-target");
    const puzzle = document.querySelector(`.shape-puzzle[data-puzzle="${target}"]`);
    if (puzzle) puzzle.classList.add("active");
  });
});

function addDragAndDrop(puzzle) {
  const pieces = puzzle.querySelectorAll(".shape-piece");
  const zones = puzzle.querySelectorAll(".shape-drop-zone");
  const message = puzzle.querySelector(".shape-message");

  pieces.forEach(piece => {
    piece.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", piece.dataset.target);
      piece.classList.add("dragging");
    });

    piece.addEventListener("dragend", () => {
      piece.classList.remove("dragging");
    });
  });

  zones.forEach(zone => {
    zone.addEventListener("dragover", e => {
      e.preventDefault();
    });

    zone.addEventListener("drop", e => {
      e.preventDefault();
      const target = e.dataTransfer.getData("text/plain");
      if (zone.dataset.accept === target && !zone.classList.contains("filled")) {
        const draggedPiece = puzzle.querySelector(`.shape-piece.dragging`);
        if (draggedPiece) {
          zone.appendChild(draggedPiece);
          zone.classList.add("filled");
          draggedPiece.draggable = false;
          draggedPiece.classList.remove("dragging");
          checkCompleted(puzzle, message);
        }
      }
    });
  });

  const resetBtn = puzzle.querySelector(".shape-reset-btn");
  resetBtn.addEventListener("click", () => {
    message.textContent = "";
    zones.forEach(zone => zone.classList.remove("filled"));
    pieces.forEach(piece => {
      piece.draggable = true;
      puzzle.querySelector(".shape-pieces").appendChild(piece);
    });
  });
}

function checkCompleted(puzzle, message) {
  const zones = puzzle.querySelectorAll(".shape-drop-zone");
  const allFilled = Array.from(zones).every(z => z.classList.contains("filled"));
  if (allFilled) {
    const name = puzzle.getAttribute("data-puzzle");
    if (name === "house") message.textContent = "Great job! You built the house!";
    if (name === "face") message.textContent = "Great job! You built the happy face!";
    if (name === "rocket") message.textContent = "Blast off! Your rocket is ready!";
    fireConfetti(puzzle);
  }
}

function fireConfetti(puzzle) {
  const container = document.createElement("div");
  container.classList.add("confetti-container");
  puzzle.appendChild(container);

  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");
    const left = Math.random() * 100;
    const delay = Math.random() * 0.7;
    const colors = ["#F0332F", "#F8BB32", "#105F9A", "#43A047"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = left + "%";
    piece.style.backgroundColor = color;
    piece.style.animationDelay = delay + "s";
    container.appendChild(piece);
  }

  setTimeout(() => {
    container.remove();
  }, 1500);
}

puzzles.forEach(p => addDragAndDrop(p));

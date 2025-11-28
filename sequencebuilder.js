const correctOrder = [
  "images/tooth1.jpg",
  "images/tooth2.jpg",
  "images/tooth3.jpg",
  "images/tooth4.jpg",
  "images/tooth5.jpg",
  "images/tooth6.jpg",
  "images/tooth7.jpg",
  "images/tooth8.jpg"
];

let shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

function loadSequence() {
  const area = document.getElementById("sequenceArea");
  area.innerHTML = "";

  shuffled.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("sequence-img");
    img.draggable = true;
    area.appendChild(img);
  });

  enableDragging();
}

function enableDragging() {
  const items = document.querySelectorAll(".sequence-img");
  let dragged = null;

  items.forEach(item => {
    item.addEventListener("dragstart", () => dragged = item);
    item.addEventListener("dragover", e => e.preventDefault());
    item.addEventListener("drop", function() {
      if (dragged !== this) {
        const parent = this.parentNode;
        const draggedNext = dragged.nextSibling;
        const thisNext = this.nextSibling;

        parent.insertBefore(dragged, thisNext);
        parent.insertBefore(this, draggedNext);

        shuffled = Array.from(document.querySelectorAll(".sequence-img")).map(i => i.src);
      }
    });
  });
}

document.getElementById("checkSequence").addEventListener("click", () => {
  const result = document.getElementById("sequenceResult");
  const current = Array.from(document.querySelectorAll(".sequence-img")).map(i => i.src);

  const isCorrect = current.every((src, index) => src.includes(correctOrder[index]));

  result.textContent = isCorrect ? "Great job! Correct order!" : "Try again!";
  result.style.color = isCorrect ? "green" : "red";
});

document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    const tabId = btn.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");

    if (tabId === "teeth") loadSequence();
  });
});

loadSequence();

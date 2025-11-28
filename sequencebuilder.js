document.addEventListener("DOMContentLoaded", () => {
  const sequences = {
    teeth: [
      { id: "1", icon: "🪥", text: "Put toothpaste on the brush" },
      { id: "2", icon: "🦷", text: "Brush your teeth carefully" },
      { id: "3", icon: "🚰", text: "Rinse your mouth with water" },
      { id: "4", icon: "😊", text: "Smile in the mirror" }
    ],
    shower: [
      { id: "1", icon: "🚿", text: "Turn on the shower" },
      { id: "2", icon: "🧼", text: "Wash your body and hair" },
      { id: "3", icon: "💧", text: "Rinse off the soap" },
      { id: "4", icon: "🧴", text: "Dry off and get cozy" }
    ],
    dress: [
      { id: "1", icon: "🩲", text: "Put on underwear and shirt" },
      { id: "2", icon: "👖", text: "Put on pants or skirt" },
      { id: "3", icon: "🧦", text: "Put on socks and shoes" },
      { id: "4", icon: "🧥", text: "Add a coat or jacket" }
    ],
    eat: [
      { id: "1", icon: "🧼", text: "Wash your hands" },
      { id: "2", icon: "🪑", text: "Sit at the table" },
      { id: "3", icon: "🍽️", text: "Eat your meal" },
      { id: "4", icon: "🙏", text: "Say thank you and tidy up" }
    ]
  };

  function shuffle(array) {
    return array
      .map(item => ({ sort: Math.random(), value: item }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);
  }

  const panels = document.querySelectorAll(".sequence-panel");

  panels.forEach(panel => {
    const key = panel.dataset.seq;
    const data = sequences[key];
    const container = panel.querySelector(".sequence-cards");
    const shuffled = shuffle(data);

    shuffled.forEach(step => {
      const card = document.createElement("div");
      card.className = "sequence-card";
      card.draggable = true;
      card.dataset.id = step.id;
      card.innerHTML = `<div>${step.icon}</div><span>${step.text}</span>`;
      container.appendChild(card);
    });

    enableDragAndDrop(container);

    const button = panel.querySelector(".sequence-check-btn");
    const feedback = panel.querySelector(".sequence-feedback");

    button.addEventListener("click", () => {
      const cards = Array.from(container.querySelectorAll(".sequence-card"));
      const currentOrder = cards.map(c => c.dataset.id);
      const correctOrder = data.map(s => s.id);
      const isCorrect = currentOrder.join(",") === correctOrder.join(",");

      if (isCorrect) {
        feedback.textContent = "Great job! The steps are in the right order!";
        feedback.className = "sequence-feedback success";
      } else {
        feedback.textContent = "Almost there! Try again.";
        feedback.className = "sequence-feedback try-again";
      }
    });
  });

  const tabs = document.querySelectorAll(".sequence-tab");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const seq = tab.dataset.seq;

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      panels.forEach(panel => {
        if (panel.dataset.seq === seq) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });

  function enableDragAndDrop(container) {
    container.addEventListener("dragstart", e => {
      if (e.target.classList.contains("sequence-card")) {
        e.target.classList.add("dragging");
      }
    });

    container.addEventListener("dragend", e => {
      if (e.target.classList.contains("sequence-card")) {
        e.target.classList.remove("dragging");
      }
    });

    container.addEventListener("dragover", e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientX);
      const dragging = container.querySelector(".sequence-card.dragging");
      if (!dragging) return;
      if (afterElement == null) {
        container.appendChild(dragging);
      } else {
        container.insertBefore(dragging, afterElement);
      }
    });
  }

  function getDragAfterElement(container, x) {
    const cards = [...container.querySelectorAll(".sequence-card:not(.dragging)")];

    return cards.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY, element: null }
    ).element;
  }
});

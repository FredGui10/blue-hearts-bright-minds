const sequences = {
    teeth: [
        "images/tooth1.jpg",
        "images/tooth2.jpg",
        "images/tooth3.jpg",
        "images/tooth4.jpg",
        "images/tooth5.jpg",
        "images/tooth6.jpg",
        "images/tooth7.jpg",
        "images/tooth8.jpg"
    ],
    shower: [
        "images/shower1.jpg",
        "images/shower2.jpg",
        "images/shower3.jpg",
        "images/shower4.jpg",
        "images/shower5.jpg",
        "images/shower6.jpg",
        "images/shower7.jpg",
        "images/shower8.jpg",
        "images/shower9.jpg"
    ],
    dress: [
        "images/dress1.jpg",
        "images/dress2.jpg",
        "images/dress3.jpg",
        "images/dress4.jpg",
        "images/dress5.jpg",
        "images/dress6.jpg",
        "images/dress7.jpg",
        "images/dress8.jpg",
        "images/dress9.jpg",
        "images/dress10.jpg",
        "images/dress11.jpg",
        "images/dress12.jpg",
        "images/dress13.jpg"
    ],
    eating: [
        "images/eat1.jpg",
        "images/eat2.jpg",
        "images/eat3.jpg",
        "images/eat4.jpg"
    ]
};

let shuffledSequences = {};

function loadSequence(activity) {
    const correctOrder = sequences[activity];
    const areaId = {
        teeth: "sequenceArea",
        shower: "sequenceAreaShower",
        dress: "sequenceAreaDress",
        eating: "sequenceAreaEating"
    }[activity];

    const area = document.getElementById(areaId);
    area.innerHTML = "";

    if (!shuffledSequences[activity]) {
        shuffledSequences[activity] = [...correctOrder].sort(() => Math.random() - 0.5);
    }

    shuffledSequences[activity].forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("sequence-img");
        img.draggable = true;
        area.appendChild(img);
    });

    enableDragging(area, activity);
}

function enableDragging(area, activity) {
    const items = area.querySelectorAll(".sequence-img");
    let dragged = null;

    items.forEach(item => {
        item.addEventListener("dragstart", () => dragged = item);
        item.addEventListener("dragover", e => e.preventDefault());

        item.addEventListener("drop", function () {
            if (dragged !== this) {
                const parent = this.parentNode;
                const draggedNext = dragged.nextSibling;
                const thisNext = this.nextSibling;

                parent.insertBefore(dragged, thisNext);
                parent.insertBefore(this, draggedNext);

                shuffledSequences[activity] =
                    Array.from(parent.querySelectorAll(".sequence-img")).map(i => i.src);
            }
        });
    });
}

document.querySelectorAll(".check-sequence-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const activity = btn.getAttribute("data-check");
        const correct = sequences[activity];
        const resultId = {
            teeth: "sequenceResult",
            shower: "sequenceResultShower",
            dress: "sequenceResultDress",
            eating: "sequenceResultEating"
        }[activity];

        const areaId = {
            teeth: "sequenceArea",
            shower: "sequenceAreaShower",
            dress: "sequenceAreaDress",
            eating: "sequenceAreaEating"
        }[activity];

        const area = document.getElementById(areaId);
        const current = Array.from(area.querySelectorAll(".sequence-img")).map(i => i.src);

        const isCorrect = current.every((src, index) =>
            src.includes(correct[index])
        );

        const result = document.getElementById(resultId);
        result.textContent = isCorrect ? "Great job! Correct order!" : "Try again!";
        result.style.color = isCorrect ? "green" : "red";
    });
});

document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");

        loadSequence(tabId);
    });
});

loadSequence("teeth");

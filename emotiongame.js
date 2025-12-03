const emotions = [
  { name: "Surprised", src: "images/surprised.jpg" },
  { name: "Tired", src: "images/tired.jpg" },
  { name: "Calm", src: "images/calm.jpg" },
  { name: "Angry", src: "images/angry.jpg" },
  { name: "Confused", src: "images/confused.jpg" },
  { name: "Excited", src: "images/excited.jpg" },
  { name: "Happy", src: "images/happy.jpg" },
  { name: "Proud", src: "images/proud.jpg" },
  { name: "Sad", src: "images/sad.jpg" },
  { name: "Scared", src: "images/scared.jpg" }
];

const emotionImage = document.getElementById("emotionImage");
const emotionPrompt = document.getElementById("emotionPrompt");
const emotionLabel = document.getElementById("emotionLabel");
const emotionProgress = document.getElementById("emotionProgress");

const prevEmotionBtn = document.getElementById("prevEmotionBtn");
const nextEmotionBtn = document.getElementById("nextEmotionBtn");
const showEmotionBtn = document.getElementById("showEmotionBtn");

let currentIndex = 0;
let isLabelVisible = false;

function renderEmotion() {
  const emotion = emotions[currentIndex];
  emotionImage.src = emotion.src;
  emotionImage.alt = `${emotion.name} emotion`;
  emotionProgress.textContent = `Emotion ${currentIndex + 1} of ${emotions.length}`;

  if (isLabelVisible) {
    emotionLabel.textContent = emotion.name;
    emotionLabel.classList.remove("hidden-label");
    showEmotionBtn.textContent = "Hide Emotion";
  } else {
    emotionLabel.textContent = emotion.name;
    emotionLabel.classList.add("hidden-label");
    showEmotionBtn.textContent = "Show Emotion";
  }

  emotionPrompt.textContent = "What emotion do you think this is?";
}

function showNextEmotion() {
  currentIndex = (currentIndex + 1) % emotions.length;
  isLabelVisible = false;
  renderEmotion();
}

function showPreviousEmotion() {
  currentIndex = (currentIndex - 1 + emotions.length) % emotions.length;
  isLabelVisible = false;
  renderEmotion();
}

function toggleEmotionLabel() {
  isLabelVisible = !isLabelVisible;
  renderEmotion();
}

prevEmotionBtn.addEventListener("click", showPreviousEmotion);
nextEmotionBtn.addEventListener("click", showNextEmotion);
showEmotionBtn.addEventListener("click", toggleEmotionLabel);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") {
    showNextEmotion();
  } else if (e.key === "ArrowLeft") {
    showPreviousEmotion();
  } else if (e.key === " ") {
    e.preventDefault();
    toggleEmotionLabel();
  }
});

renderEmotion();

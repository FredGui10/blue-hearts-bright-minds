const teaAudio = document.getElementById("teaAudio");

// OPTIONAL: If you add a real video later, use this to sync them
// const teaVideo = document.getElementById("teaVideo");

// Audio controls (for future video sync)
teaAudio.addEventListener("play", () => {
    console.log("Audio playing...");
    // teaVideo.play();
});

teaAudio.addEventListener("pause", () => {
    console.log("Audio paused...");
    // teaVideo.pause();
});

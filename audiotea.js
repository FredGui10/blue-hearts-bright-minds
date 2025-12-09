const teaAudio = document.getElementById("teaAudio");

teaAudio.addEventListener("play", () => {
    console.log("Audio playing...");
});

teaAudio.addEventListener("pause", () => {
    console.log("Audio paused...");
});

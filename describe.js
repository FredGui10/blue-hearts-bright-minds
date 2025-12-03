document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".describe-tab");
  const scenes = document.querySelectorAll(".describe-scene");
  const detailButtons = document.querySelectorAll(".show-details-btn");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      scenes.forEach(scene => {
        if (scene.id === targetId) {
          scene.classList.add("active");
        } else {
          scene.classList.remove("active");
        }
      });
    });
  });

  detailButtons.forEach(button => {
    button.addEventListener("click", () => {
      const listId = button.getAttribute("data-target-list");
      const list = document.getElementById(listId);
      if (!list) return;

      const isVisible = list.classList.contains("visible");
      if (isVisible) {
        list.classList.remove("visible");
        button.textContent = "Show ideas";
      } else {
        list.classList.add("visible");
        button.textContent = "Hide ideas";
      }
    });
  });
});

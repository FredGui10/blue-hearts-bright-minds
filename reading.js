const stories = {
  milo: {
    title: "Milo the Cat Finds a Friend",
    pages: [
      {
        img: "images/milo1.jpg",
        alt: "Milo the cat with a little mouse and sunflowers",
        text:
          "Milo the orange cat lived in a sunny garden. He loved the warm grass, the tall flowers, and watching the clouds move slowly across the sky."
      },
      {
        img: "images/milo2.jpg",
        alt: "Milo the cat sitting in the grass",
        text:
          "Most days were quiet. Milo liked quiet, but sometimes he wished he had a friend to share the soft grass and the gentle breeze."
      },
      {
        img: "images/milo3.jpg",
        alt: "A small blue bird in the grass",
        text:
          "One morning, a tiny blue bird landed nearby and chirped a cheerful song. Milo listened carefully. The song made his heart feel light."
      },
      {
        img: "images/milo4.jpg",
        alt: "A sunny path and a wooden fence",
        text:
          "The bird flew toward the fence at the end of the garden. Curious, Milo followed the winding path, his tail swishing happily behind him."
      },
      {
        img: "images/milo5.jpg",
        alt: "Milo meeting a gray mouse near a bowl of food",
        text:
          "There, by a little bowl, sat a shy gray mouse. Milo slowly sat down and pushed the bowl closer. The mouse gave a small smile and took a tiny bite."
      },
      {
        img: "images/milo6.jpg",
        alt: "A mouse with a piece of cheese",
        text:
          "The mouse shared a bit of cheese with Milo. They ate together in the sunshine. From that day on, Milo knew he was not alone. He had a new friend."
      }
    ]
  },

  luna: {
    title: "Luna’s Colorful Day",
    pages: [
      {
        img: "images/luna1.jpg",
        alt: "Luna surrounded by crayons, paint, and bubbles",
        text:
          "Luna loved colors. She loved bright crayons, soft paints, and shiny bubbles that floated like tiny rainbows in the air."
      },
      {
        img: "images/luna2.jpg",
        alt: "Crayons, a rainbow drawing, bubbles, and a little mouse",
        text:
          "On her art table, Luna lined up her crayons in a rainbow row. A little mouse friend watched as Luna drew a big, happy rainbow on her paper."
      },
      {
        img: "images/luna3.jpg",
        alt: "Luna’s cozy bedroom",
        text:
          "When the world felt too loud, Luna liked to sit in her cozy room. The soft light, warm blankets, and favorite chair helped her feel calm and safe."
      },
      {
        img: "images/luna4.jpg",
        alt: "Luna smiling warmly",
        text:
          "Luna took a deep breath and smiled. She remembered that when she made art, she could show her feelings without saying a word."
      },
      {
        img: "images/luna5.jpg",
        alt: "Luna drawing a rainbow with a crayon",
        text:
          "She drew another rainbow. Red was for brave, orange for warm hugs, yellow for sunshine, green for quiet walks, blue for peaceful skies, and purple for dreams. It was Luna’s colorful, gentle day."
      }
    ]
  },

  ben: {
    title: "Ben and the Missing Star",
    pages: [
      {
        img: "images/ben1.jpg",
        alt: "Ben looking at a glowing star in the night sky",
        text:
          "Ben loved watching the night sky. One evening he noticed something special: a bright star that seemed to blink just for him."
      },
      {
        img: "images/ben2.jpg",
        alt: "A smiling golden star",
        text:
          "The star looked friendly, almost as if it were smiling. Ben whispered, “Hello, little star.” In his heart, he named the star Spark."
      },
      {
        img: "images/ben3.jpg",
        alt: "A forest path under a sky full of stars",
        text:
          "The next night, Spark was missing from its place in the sky. Ben followed a quiet forest path, wondering where his shining friend had gone."
      },
      {
        img: "images/ben4.jpg",
        alt: "A glowing star floating above the grass",
        text:
          "Soon Ben saw a soft glow over the grass. There was Spark, hovering low and shining gently. The star seemed tired and a little scared."
      },
      {
        img: "images/ben5.jpg",
        alt: "Ben sitting under the stars",
        text:
          "Ben sat down and breathed slowly with Spark. In, out, in, out. With each calm breath, Spark floated higher until it returned to the sky. Ben waved goodnight, feeling peaceful and ready to sleep."
      }
    ]
  },

  ellie: {
    title: "Ellie’s Big Garden Adventure",
    pages: [
      {
        img: "images/ellie1.jpg",
        alt: "Ellie walking in a garden full of animals",
        text:
          "Ellie loved the garden. Everywhere she looked, little creatures were busy: butterflies, ladybugs, snails, and even a friendly squirrel."
      },
      {
        img: "images/ellie2.jpg",
        alt: "Ellie looking at a snail and a butterfly",
        text:
          "She knelt down to say hello to a slow, shiny snail. A butterfly fluttered by, its wings bright like tiny flags in the sky."
      },
      {
        img: "images/ellie3.jpg",
        alt: "Ellie walking with many garden animals around her",
        text:
          "As Ellie walked along the path, more animals joined her. She moved gently so no one would be scared. The garden felt like a big, friendly party."
      },
      {
        img: "images/ellie4.jpg",
        alt: "Ellie talking with a squirrel and snails",
        text:
          "Ellie sat down beside the squirrel and the snails. She talked softly about her day. The animals listened, and Ellie felt calm and understood."
      },
      {
        img: "images/ellie5.jpg",
        alt: "Ellie watering flowers with a watering can",
        text:
          "She gave the flowers a cool drink of water. The leaves shook with tiny drops, and the butterflies danced through the sparkling air."
      },
      {
        img: "images/ellie6.jpg",
        alt: "Ellie smelling flowers with a butterfly and ladybug nearby",
        text:
          "Ellie took one last slow walk through the garden, smelling each flower and watching each small friend. Her heart felt full of quiet joy as she whispered, “See you tomorrow.”"
      }
    ]
  }
};

const imageEl = document.getElementById("storyImage");
const titleEl = document.getElementById("storyTitle");
const paragraphEl = document.getElementById("storyParagraph");
const pageIndicatorEl = document.getElementById("pageIndicator");
const prevBtn = document.getElementById("prevPageBtn");
const nextBtn = document.getElementById("nextPageBtn");
const tabButtons = document.querySelectorAll(".story-tab");

let currentStoryKey = "milo";
let currentPageIndex = 0;

function updatePage() {
  const story = stories[currentStoryKey];
  const page = story.pages[currentPageIndex];

  imageEl.src = page.img;
  imageEl.alt = page.alt;
  titleEl.textContent = story.title;
  paragraphEl.textContent = page.text;

  const total = story.pages.length;
  pageIndicatorEl.textContent = `Page ${currentPageIndex + 1} of ${total}`;

  prevBtn.disabled = currentPageIndex === 0;
  nextBtn.disabled = currentPageIndex === total - 1;
}

function changeStory(key) {
  currentStoryKey = key;
  currentPageIndex = 0;
  tabButtons.forEach(btn => {
    if (btn.dataset.story === key) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  updatePage();
}

prevBtn.addEventListener("click", () => {
  if (currentPageIndex > 0) {
    currentPageIndex--;
    updatePage();
  }
});

nextBtn.addEventListener("click", () => {
  const total = stories[currentStoryKey].pages.length;
  if (currentPageIndex < total - 1) {
    currentPageIndex++;
    updatePage();
  }
});

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.story;
    if (key !== currentStoryKey) {
      changeStory(key);
    }
  });
});

updatePage();

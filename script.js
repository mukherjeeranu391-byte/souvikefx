const filterButtons = document.querySelectorAll("[data-filter]");
const videoCards = document.querySelectorAll(".video-card");
const videosSection = document.querySelector("#videos");
const videos = document.querySelectorAll("video");

function unmuteVideo(video) {
  video.defaultMuted = false;
  video.muted = false;
  video.volume = 1;
}

videos.forEach((video) => {
  unmuteVideo(video);
  video.addEventListener("play", () => unmuteVideo(video));
  video.addEventListener("click", () => unmuteVideo(video));
});

function pauseHiddenVideos() {
  videoCards.forEach((card) => {
    if (card.hidden) {
      const video = card.querySelector("video");
      if (video) video.pause();
    }
  });
}

function showVideoGroup(group) {
  videoCards.forEach((card) => {
    const groups = (card.dataset.groups || "").split(" ");
    card.hidden = group !== "all" && !groups.includes(group);
    card.classList.toggle("large", false);
  });

  const firstVisible = document.querySelector(".video-card:not([hidden])");
  if (firstVisible) firstVisible.classList.add("large");

  pauseHiddenVideos();
  videosSection?.scrollIntoView({ behavior: "smooth", block: "start" });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showVideoGroup(button.dataset.filter);
  });
});

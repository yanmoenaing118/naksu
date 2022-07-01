window.onload = () => {
  const typingText = document.getElementById("typing-text");
  const text = `<div>Naksu</div>  <span>The Shadow Assassin</span>`;

  typingText.innerHTML = text;
  typingText.style.setProperty("--characters", text.length);

  const playBtn = document.querySelector(".play");
  const closeBtn = document.querySelector(".close-video");

  const videoContainer = document.querySelector(".video");
  const video = document.querySelector("video");

  playBtn.addEventListener("click", (e) => {
    sequence(() => {
      videoContainer.style.zIndex = 12;
    }).then(() =>
      sequence(() => {
        videoContainer.style.opacity = 1;
        video.play();
      })
    );
  });

  closeBtn.addEventListener("click", (e) => {
    video.pause();

    sequence(() => {
      videoContainer.style.opacity = 0;
    }).then(() =>
      sequence(() => {
        videoContainer.style.zIndex = -5;
      })
    );
  });
};

function sequence(cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, 0);
  });
}


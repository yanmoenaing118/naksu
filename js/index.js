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


    videoContainer.style.transform = "scale(1)";
    videoContainer.style.opacity = 1;
    
    video.play();

  });

  console.log(closeBtn);

  closeBtn.addEventListener("click", e => {
    console.log("click")
    videoContainer.style.transform = "scale(0)";
    videoContainer.style.opacity = 0;
    
    video.pause();

  })


};


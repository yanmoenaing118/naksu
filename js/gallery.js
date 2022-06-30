window.onload = start;

function start() {
  const up = document.getElementById("up");
  const down = document.getElementById("down");
  const gallery = document.querySelector(".gallery");
  const gallerImages = document.querySelectorAll(".gallery-img");
  let activeIndex = 0;
  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.4,
  });

  gallerImages.forEach((el) => observer.observe(el));

  up.addEventListener("click", () => handleNavigation("up"));
  down.addEventListener("click", () => handleNavigation("down"));

  function handleNavigation(dir) {
    if (activeIndex > gallerImages.length || activeIndex < 0) return;

    const scrollBy = getScrollBy(gallerImages[activeIndex]);
    if (dir === "up") {
      if (gallery.scrollTop <= 0) return;
      gallery.scrollBy(0, scrollBy * -1);
      activeIndex = Math.min(gallerImages.length, activeIndex + 1);
    } else {
      gallery.scrollBy(0, scrollBy);
      activeIndex = Math.max(0, activeIndex - 1);
    }
  }

  function observerCallback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = Math.min(1, entry.intersectionRatio * 2);
      } else {
        entry.target.style.opacity = 0;
      }
    });
  }
}

function getScrollBy(activeEl) {
  return activeEl.offsetHeight;
}

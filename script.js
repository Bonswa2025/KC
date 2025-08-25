document.addEventListener("DOMContentLoaded", () => {
  const videoIds = ["ui98lNylzBA"]; // Add video ids on youtube that you want here

  const inner = document.querySelector(".video-carousel .carousel-inner");
  const prevBtn = document.querySelector(".video-carousel .prev");
  const nextBtn = document.querySelector(".video-carousel .next");

  if (!inner || !prevBtn || !nextBtn) {
    console.warn("Carousel: missing expected DOM elements.");
    return;
  }

  let current = 0;

  videoIds.forEach((id, idx) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.setAttribute("data-video-id", id);
    slide.setAttribute("role", "tabpanel");
    slide.setAttribute("aria-hidden", idx === 0 ? "false" : "true");
    if (idx === 0) slide.classList.add("active");
    inner.appendChild(slide);
  });

  function loadIframe(idx) {
    const slide = inner.children[idx];
    if (!slide) return;
    if (slide.querySelector("iframe")) return;
    const vid = slide.dataset.videoId;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${vid}`;
    iframe.title = "YouTube video";
    iframe.setAttribute("allowfullscreen", "");
    slide.appendChild(iframe);
  }

  function updateControls() {
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === videoIds.length - 1;
  }

  function goTo(index) {
    if (index < 0 || index >= videoIds.length) return;

    // deactivate previous
    inner.children[current].classList.remove("active");
    inner.children[current].setAttribute("aria-hidden", "true");

    current = index;

    // activate new
    inner.children[current].classList.add("active");
    inner.children[current].setAttribute("aria-hidden", "false");

    loadIframe(current);
    updateControls();
  }

  prevBtn.addEventListener("click", () => {
    goTo(current - 1);
  });
  nextBtn.addEventListener("click", () => {
    goTo(current + 1);
  });

  // initial load
  loadIframe(0);
  updateControls();
});



document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuContent = document.querySelector(".menu-content");
  const menuPreviewImg = document.querySelector(".menu-preview-img");
  const menuLinks = document.querySelectorAll(".link a");

  let isOpen = false;
  let isAnimating = false;

  menuToggle.addEventListener("click", () => {
    if (!isOpen) openMenu();
    else closeMenu();
  });

  function resetPreviewImage() {
    menuPreviewImg.innerHTML = "";
    const img = document.createElement("img");
    img.src = "img-1.jpeg";
    img.style.opacity = "1";
    menuPreviewImg.appendChild(img);
  }

  function cleanupPreviewImages() {
    const imgs = menuPreviewImg.querySelectorAll("img");
    if (imgs.length > 3) {
      for (let i = 0; i < imgs.length - 3; i++) {
        imgs[i].remove();
      }
    }
  }

  function animateMenuToggle(opening) {
    const open = document.querySelector("#menu-open");
    const close = document.querySelector("#menu-close");

    gsap.to(opening ? open : close, {
      opacity: 0,
      x: opening ? -5 : 5,
      y: opening ? -10 : 10,
      rotation: opening ? -5 : 5,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(opening ? close : open, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      delay: 0.25,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  function openMenu() {
    if (isAnimating || isOpen) return;
    isAnimating = true;

    resetPreviewImage();
    animateMenuToggle(true);

    gsap.to(container, {
      rotation: 10,
      x: 300,
      y: 450,
      scale: 1.5,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to(menuContent, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to([".link a", ".social a"], {
      y: "0%",
      opacity: 1,
      delay: 0.75,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(menuOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });
  }

  function closeMenu() {
    if (isAnimating || !isOpen) return;
    isAnimating = true;

    animateMenuToggle(false);

    gsap.to(container, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to(menuContent, {
      rotation: -15,
      x: -100,
      y: -100,
      scale: 1.5,
      opacity: 0.25,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to(menuOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        gsap.set([".link a", ".social a"], { y: "120%" });
      },
    });
  }

  menuLinks.forEach((link) => {
    function changeImage() {
      if (!isOpen || isAnimating) return;

      const src = link.dataset.img;
      if (!src) return;

      const imgs = menuPreviewImg.querySelectorAll("img");
      if (imgs.length && imgs[imgs.length - 1].src.includes(src)) return;

      const img = document.createElement("img");
      img.src = src;
      img.style.opacity = "0";
      img.style.transform = "scale(1.25) rotate(10deg)";
      menuPreviewImg.appendChild(img);

      cleanupPreviewImages();

      gsap.to(img, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.75,
        ease: "power2.out",
      });
    }

    link.addEventListener("mouseenter", changeImage); // desktop hover
    link.addEventListener("click", changeImage);     // mobile tap
  });

  const body = document.body;

menuOpen.addEventListener("click", () => {
    body.classList.add("menu-open");
});

menuClose.addEventListener("click", () => {
    body.classList.remove("menu-open");
});

});

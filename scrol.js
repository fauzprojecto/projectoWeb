gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".spacep").forEach(text => {
  const words = text.textContent.trim().split(" ");

  text.innerHTML = words
    .map(word => {
      const letters = word
        .split("")
        .map(l => `<span class="char">${l}</span>`)
        .join("");
      return `<span class="word">${letters}</span>`;
    })
    .join(" ");
});

const heroTitle = document.querySelector(".hero h1");

gsap.to(heroTitle, {
  opacity: 0,
  y: -40,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".spacer",        
    start: "top 60%",          
    end: "top 10%",
    scrub: true                
  }
});
gsap.utils.toArray(".spaceb").forEach(box => {
  const chars = box.querySelectorAll(".char");

  
  gsap.set(box, { opacity: 0, y: 80, scale: 0.9 });
  gsap.set(chars, { opacity: 0, y: 20 });

  ScrollTrigger.create({
    trigger: box,
    start: "top 75%",
    end: "bottom 25%",

    onEnter: () => {
      gsap.to(box, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out"
      });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.015,
        delay: 0.2
      });
    },

    onLeaveBack: () => {
      
      gsap.to(chars, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: "power1.in",
        stagger: {
          each: 0.01,
          from: "end"
        }
      });

      gsap.to(box, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.35,
        ease: "power2.in",
        delay: 0.05
      });
    }
  });
});

window.addEventListener("load", () => ScrollTrigger.refresh());

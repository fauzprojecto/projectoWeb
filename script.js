const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});
signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});
window.addEventListener("load", () => {
  gsap.to(".wrapper", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out"
  });
});
function goBack(e) {
  e.preventDefault();

  gsap.to(".wrapper", {
    y: 200,
    opacity: 0,
    duration: 0.6,
    ease: "power4.in",
    onComplete: () => {
      window.location.href = "index.html";
    }
  });
}



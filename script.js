const SUPABASE_URL = "https://cfjczgcxmafhzwnhkjuw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmamN6Z2N4bWFmaHp3bmhranV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwOTc1NzUsImV4cCI6MjA4MTY3MzU3NX0.xC-7YWjbtYU6nybio3tO7VQl6Y9mgzH_ROZXBVSsttE";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const wrapper = document.querySelector(".wrapper");
const signInBtnLink = document.querySelector(".signInBtn-link");
const signUpBtnLink = document.querySelector(".signUpBtn-link");
const signUpForm = document.querySelector(".sign-up form");
const signInForm = document.querySelector(".sign-in form");


signUpBtnLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.add("active");
});

signInBtnLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.remove("active");
});


window.addEventListener("load", () => {
  gsap.fromTo(
    ".wrapper",
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
  );
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
    },
  });
}


signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = signUpForm.querySelector(
    'input[type="text"]'
  ).value.trim();
  const email = signUpForm.querySelector(
    'input[type="email"]'
  ).value.trim();
  const password = signUpForm.querySelector(
    'input[type="password"]'
  ).value;

  if (!username || !email || !password) {
    alert("Semua field wajib diisi!");
    return;
  }

  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Sign up berhasil! Silakan login.");
  signUpForm.reset();
  wrapper.classList.remove("active");
});


signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signInForm.querySelector(
    'input[type="text"]'
  ).value.trim();
  const password = signInForm.querySelector(
    'input[type="password"]'
  ).value;

  if (!email || !password) {
    alert("Email dan password wajib diisi!");
    return;
  }

  const { data, error } = await sb.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login gagal: " + error.message);
    return;
  }

  alert("Login berhasil!");
  window.location.href = "index.html";
});


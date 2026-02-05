// // ================= THEME BY DATE =================
// function getThemeByDate() {
//   const today = new Date();
//   today.setHours(0,0,0,0);

//   const day1 = new Date("2026-02-14"); // Night sky
//   const day2 = new Date("2026-02-15"); // Sunrise petals

//   if (today.getTime() === day2.getTime()) return "sunrise";
//   return "night";
// }

// // ================= DATE ACCESS CONTROL =================
// function checkAccess(unlockDate) {
//   const today = new Date();
//   const [year, month, day] = unlockDate.split('-').map(Number);
//   const allowedDate = new Date(year, month - 1, day);

//   today.setHours(0, 0, 0, 0);
//   allowedDate.setHours(0, 0, 0, 0);

//   const theme = getThemeByDate();

//   // ===== Apply Theme =====
//   if (theme === "night") {
//     createSky();
//     createHearts();
//   }

//   if (theme === "sunrise") {
//     applySunriseTheme();
//     startPetals();
//   }

//   // ===== Lock Page if date not reached =====
//   if (today < allowedDate) {
//     const container = document.querySelector(".container");
//     if (container) container.remove();

//     const lockDiv = document.createElement("div");
//     lockDiv.classList.add("container");
//     lockDiv.innerHTML = `
//       <h1>⏳ Not Yet My Love ❤️</h1>
//       <p>This surprise will unlock on</p>
//       <h2>${allowedDate.toDateString()}</h2>
//       <p>Come back Later Baby 😘</p>
//     `;
//     document.body.appendChild(lockDiv);
//     return false;
//   }
// }

// // ================= DAY 1 : REAL NIGHT SKY (Canvas, Zoomed Out) =================
// function createSky() {
//   const canvas = document.createElement("canvas");
//   canvas.id = "sky";
//   document.body.appendChild(canvas);

//   const ctx = canvas.getContext("2d");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   let stars = [];
//   const STAR_COUNT = 300;

//   for (let i = 0; i < STAR_COUNT; i++) {
//     stars.push({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       radius: Math.random() * 0.8 + 0.2, // smaller stars for zoom out
//       alpha: Math.random(),
//       twinkleSpeed: Math.random() * 0.015 + 0.002, // slower twinkle
//       shooting: false,
//       shootSpeed: Math.random() * 2 + 1 // slower shooting
//     });
//   }

//   function drawStars() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     stars.forEach(star => {
//       star.alpha += star.twinkleSpeed;
//       if (star.alpha >= 1 || star.alpha <= 0) {
//         star.twinkleSpeed = -star.twinkleSpeed;
//       }

//       ctx.beginPath();
//       ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//       ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
//       ctx.fill();

//       if (star.shooting) {
//         ctx.beginPath();
//         ctx.moveTo(star.x, star.y);
//         ctx.lineTo(star.x - 60, star.y + 60); // smaller line for zoomed out
//         ctx.strokeStyle = `rgba(255,255,255,0.7)`; // less bright shooting star
//         ctx.lineWidth = 1.5;
//         ctx.stroke();

//         star.x += star.shootSpeed;
//         star.y -= star.shootSpeed;

//         if (star.x > canvas.width || star.y < 0) {
//           resetStar(star);
//         }
//       }
//     });

//     requestAnimationFrame(drawStars);
//   }

//   function resetStar(star) {
//     star.x = Math.random() * canvas.width;
//     star.y = Math.random() * canvas.height;
//     star.shooting = false;
//   }

//   // shooting star interval
//   setInterval(() => {
//     const index = Math.floor(Math.random() * stars.length);
//     stars[index].shooting = true;
//   }, 4000); // less frequent shooting

//   drawStars();

//   window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   });
// }

// // ================= HEART STARS =================
// function createHearts() {
//   const totalHearts = 40;

//   for (let i = 0; i < totalHearts; i++) {
//     const heart = document.createElement("div");
//     heart.classList.add("heart");

//     heart.style.top = Math.random() * 100 + "vh";
//     heart.style.left = Math.random() * 100 + "vw";

//     const size = Math.random() * 5 + 4; // smaller hearts
//     heart.style.width = size + "px";
//     heart.style.height = size + "px";

//     heart.style.animationDelay = Math.random() * 3 + "s";

//     document.body.appendChild(heart);
//   }
// }

// // ================= DAY 2 : SUNRISE =================
// function applySunriseTheme() {
//   document.body.style.background = "linear-gradient(to top, #ff9a9e, #fad0c4)";
//   document.body.style.color = "#4a2c2a";
//   document.body.classList.add("sunrise-theme");
// }

// // ================= DAY 2 : FALLING PETALS =================
// function startPetals() {
//   setInterval(() => {
//     const petal = document.createElement("div");
//     petal.className = "petal";

//     petal.style.left = Math.random() * 100 + "vw";
//     petal.style.animationDuration = (Math.random() * 3 + 4) + "s";

//     document.body.appendChild(petal);

//     setTimeout(() => petal.remove(), 7000);
//   }, 300);
// }





//// ================= ACCESS CONTROL =================
function checkAccess(unlockDate, theme = "night") {
  const today = new Date();
  today.setHours(0,0,0,0);

  const [y,m,d] = unlockDate.split("-").map(Number);
  const allowedDate = new Date(y, m-1, d);
  allowedDate.setHours(0,0,0,0);

  if (today < allowedDate) {
    document.body.classList.add("waiting-theme");
    document.body.innerHTML = `
      <div class="waiting-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
      <div class="floating-hearts">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span>
      </div>
      <div class="container waiting-card">
        <div class="pulse-heart"></div>
        <h1>⏳ Not Yet My Love ❤️</h1>
        <p>This surprise unlocks on</p>
        <h2>${allowedDate.toDateString()}</h2>
        <p>Counting the moments until I can show you how much I love you.</p>
        <div class="photo-row">
          <img src="img/us-1.jpg" alt="Our memory 1">
          <img src="img/us-2.jpg" alt="Our memory 2">
          <img src="img/us-3.jpg" alt="Our memory 3">
        </div>
        <p class="photo-note">Replace these photos with your favorite moments.</p>
      </div>
    `;
    createWaitingStars();
    return;
  }

  applyTheme(theme);
}

// ================= WAITING THEME =================
function createWaitingStars() {
  const layer = document.createElement("div");
  layer.className = "twinkle-layer";

  for (let i = 0; i < 40; i++) {
    const star = document.createElement("span");
    star.className = "twinkle";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.opacity = (Math.random() * 0.6 + 0.2).toFixed(2);
    layer.appendChild(star);
  }

  document.body.appendChild(layer);
}

// ================= THEMES =================
function applyTheme(theme) {
  document.body.classList.remove(
    "theme-rose",
    "theme-propose",
    "theme-choco",
    "theme-teddy",
    "theme-promise",
    "theme-hug",
    "theme-kiss",
    "theme-valentine"
  );

  if (theme === "night") {
    createNightTheme();
    return;
  }

  if (theme === "rose") {
    document.body.classList.add("theme-rose");
    createFloatLayer("rose-layer", 22);
    return;
  }

  if (theme === "propose") {
    document.body.classList.add("theme-propose");
    createFloatLayer("propose-layer", 18);
    return;
  }

  if (theme === "choco") {
    document.body.classList.add("theme-choco");
    createFloatLayer("choco-layer", 24);
    return;
  }

  if (theme === "teddy") {
    document.body.classList.add("theme-teddy");
    createFloatLayer("teddy-layer", 16);
    return;
  }

  if (theme === "promise") {
    document.body.classList.add("theme-promise");
    createFloatLayer("promise-layer", 14);
    return;
  }

  if (theme === "hug") {
    document.body.classList.add("theme-hug");
    createFloatLayer("hug-layer", 20);
    return;
  }

  if (theme === "kiss") {
    document.body.classList.add("theme-kiss");
    createFloatLayer("kiss-layer", 18);
    return;
  }

  if (theme === "valentine") {
    document.body.classList.add("theme-valentine");
    createFloatLayer("valentine-layer", 24);
    return;
  }
}

function createFloatLayer(className, count) {
  const layer = document.createElement("div");
  layer.className = `float-layer ${className}`;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.style.left = Math.random() * 100 + "vw";
    item.style.animationDelay = Math.random() * 3 + "s";
    item.style.animationDuration = (Math.random() * 6 + 8) + "s";
    layer.appendChild(item);
  }

  document.body.appendChild(layer);
}

// ================= ENVELOPE INTRO =================
function openEnvelope() {
  const screen = document.getElementById("envelopeScreen");
  const envelope = screen ? screen.querySelector(".envelope") : null;
  const mainPage = document.getElementById("mainPage");

  if (envelope) envelope.classList.add("open");

  setTimeout(() => {
    if (screen) screen.classList.add("hidden");
    if (mainPage) mainPage.classList.add("show");
  }, 600);
}

// ================= LOVE BUTTON RUNAWAY =================
function runAwayNo() {
  const btn = document.getElementById("loveNo");
  if (!btn) return;

  const padding = 8;
  const card = document.querySelector(".love-card");
  if (!card) return;

  const maxX = Math.max(0, card.clientWidth - btn.offsetWidth - padding);
  const maxY = Math.max(0, card.clientHeight - btn.offsetHeight - padding);

  const x = Math.max(padding, Math.floor(Math.random() * (maxX + 1)));
  const y = Math.max(padding, Math.floor(Math.random() * (maxY + 1)));

  btn.style.position = "absolute";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
  btn.style.right = "auto";
  btn.style.bottom = "auto";
  btn.style.transform = "none";
}


// ================= NIGHT THEME =================
function createNightTheme() {
  createSky();
  createHearts();
}

// ================= SKY + SHOOTING STARS =================
function createSky() {
  const canvas = document.createElement("canvas");
  canvas.id = "sky";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  resize();

  const stars = Array.from({ length: 300 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 0.8 + 0.2,
    a: Math.random(),
    t: Math.random() * 0.015 + 0.002,
    shooting: false,
    speed: Math.random() * 3 + 2
  }));

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(s => {
      s.a += s.t;
      if (s.a <= 0 || s.a >= 1) s.t *= -1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.fill();

      if (s.shooting) {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - 80, s.y + 80);
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        s.x += s.speed;
        s.y -= s.speed;

        if (s.x > canvas.width || s.y < 0) resetStar(s);
      }
    });

    requestAnimationFrame(draw);
  }

  function resetStar(s) {
    s.x = Math.random() * canvas.width;
    s.y = Math.random() * canvas.height;
    s.shooting = false;
  }

  setInterval(() => {
    const s = stars[Math.floor(Math.random() * stars.length)];
    s.shooting = true;
  }, 3500);

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  window.addEventListener("resize", resize);
  draw();
}

// ================= HEARTS =================
function createHearts() {
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDelay = Math.random() * 3 + "s";
    document.body.appendChild(heart);
  }
}

// ================= YES BUTTON HANDLER =================
function goToJoy() {
  // user interaction → allows autoplay audio on joy page
  window.location.href = "joy.html";
}


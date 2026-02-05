//// ================= ACCESS CONTROL =================
function checkAccess(unlockDate, theme = "night") {
  const root = document.documentElement;
  const today = new Date();
  today.setHours(0,0,0,0);

  const [y,m,d] = unlockDate.split("-").map(Number);
  const allowedDate = new Date(y, m-1, d);
  allowedDate.setHours(0,0,0,0);

  if (today < allowedDate) {
    const waitingCard = getNextWaitingCard();
    document.body.classList.remove(
      "theme-rose",
      "theme-propose",
      "theme-choco",
      "theme-teddy",
      "theme-promise",
      "theme-hug",
      "theme-kiss",
      "theme-valentine",
      "waiting-theme"
    );
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
        <h1>${waitingCard.title}</h1>
        <p>${waitingCard.subtitle}</p>
        <h2>${allowedDate.toDateString()}</h2>
        <p>${waitingCard.message}</p>
        <div class="photo-row">
          ${waitingCard.photos.map(photo => `<img src="${photo.src}" alt="${photo.alt}">`).join("")}
        </div>
        ${waitingCard.note ? `<p class="photo-note">${waitingCard.note}</p>` : ""}
      </div>
    `;
    createWaitingStars();
    root.dataset.accessChecked = "true";
    return;
  }

  applyTheme(theme);
  root.dataset.accessChecked = "true";
}

// ================= WAITING CARD ROTATION =================
const waitingCards = [
  {
    title: "Not Yet My Love😚",
    subtitle: "This surprise unlocks on",
    message: "Thoda sa baby ji, itta 🤌 sa baccha .",
    note: "I love you dheeeerrrr saara mera baby muah💋💏",
    photos: [
      { src: "assets/images/distanceDosentMatter.jpg", alt: "Our memory" },
      { src: "assets/images/Hand.jpg", alt: "Our memory" },
      { src: "assets/images/together.jpg", alt: "Our memory" }
    ]
  },
  {
    title: "Almost There",
    subtitle: "Your surprise opens on",
    message: "Duddu mera muah thoda sa ruk jaao 🥰,</br> Aao tanik baate ho jaaye time beet jayega.❤️",
    note: "Dheer saari kisss muah 💋😚",
    photos: [
      { src: "assets/images/Snapchat-1804088865.jpg", alt: "Our memory" },
      { src: "assets/images/IMG20251223100015.jpg", alt: "Our memory" },
      { src: "assets/images/IMG20251223173606.jpg", alt: "Our memory" }
    ]
  },
  {
    title: "A Tiny Wait",
    subtitle: "The magic begins on",
    message: "Every day with you is special, even the waiting ones.",
    note: "Mera dudduu mera dudduu muah muah muah 💋💋💋",
    photos: [
      { src: "assets/images/IMG20251223094245.jpg", alt: "Our memory" },
      { src: "assets/images/IMG20251223093735.jpg", alt: "Our memory" },
      { src: "assets/images/IMG20251223103058.jpg", alt: "Our memory" }
    ]
  },
  {
    title: "Secret Surprise",
    subtitle: "Unlock date",
    message: "Baby ji noiii abbi noii baccha 😚😚😚.",
    note: "Meri nakchadhi khi ki ruko tanik.",
    photos: [
      { src: "assets/images/IMG20250603181606.jpg", alt: "Our memory" },
      { src: "assets/images/WhatsApp Image 2025-03-29 at 09.49.48_e41fc3a3.jpg", alt: "Our memory" },
      { src: "assets/images/IMG20251223202138.jpg", alt: "Our memory" }
    ]
  }
];

function getNextWaitingCard() {
  const key = "waitingCardIndex";
  try {
    const current = Number(localStorage.getItem(key) || "0");
    const next = Number.isNaN(current) ? 0 : current;
    const card = waitingCards[next % waitingCards.length];
    localStorage.setItem(key, String((next + 1) % waitingCards.length));
    return card;
  } catch (err) {
    return waitingCards[Math.floor(Math.random() * waitingCards.length)];
  }
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
let noHoverCount = 0;
let noClickCount = 0;
const noTexts = [
  "No",
  "Are you sure?",
  "Think again",
  "Please?",
  "Pretty please?",
  "Don't break my heart",
  "Okay... Yes?"
];

function runAwayNo() {
  const btn = document.getElementById("loveNo");
  if (!btn) return;

  const padding = 8;
  const container = btn.parentElement;
  if (!container) return;

  noHoverCount += 1;

  const textIndex = Math.min(noTexts.length - 1, Math.floor(noHoverCount / 2));
  btn.textContent = noTexts[textIndex];

  const maxX = Math.max(0, container.clientWidth - btn.offsetWidth - padding);
  const maxY = Math.max(0, container.clientHeight - btn.offsetHeight - padding);

  const x = Math.max(padding, Math.floor(Math.random() * (maxX + 1)));
  const y = Math.max(padding, Math.floor(Math.random() * (maxY + 1)));

  btn.style.position = "absolute";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
  btn.style.right = "auto";
  btn.style.bottom = "auto";
  btn.style.transform = "none";

  if (noHoverCount >= 8) {
    btn.textContent = "Yes";
    btn.classList.add("love-yes");
    btn.classList.remove("love-no");
    btn.id = "loveYesFromNo";
    btn.onclick = () => goToJoy();
    btn.onmouseenter = null;
  }
}

// Make "No" react on click too
document.addEventListener("click", (e) => {
  const btn = document.getElementById("loveNo");
  if (!btn) return;
  if (e.target !== btn) return;

  noClickCount += 1;
  runAwayNo();

  if (noClickCount >= 3 && noHoverCount < 8) {
    btn.textContent = "You're too cute to say no";
  }
});


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





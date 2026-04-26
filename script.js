/* ===================== */
/*   FLOATING PETALS     */
/* ===================== */
const petalEmojis = ['🌸', '🌺', '💮', '🌹', '💕', '🌷', '💗'];

function createPetal() {
  const container = document.getElementById('petals');
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = (Math.random() * 1.2 + 0.7) + 'rem';
  const duration = Math.random() * 8 + 7;
  petal.style.animationDuration = duration + 's';
  petal.style.animationDelay = Math.random() * 6 + 's';
  container.appendChild(petal);

  setTimeout(() => petal.remove(), (duration + 6) * 1000);
}

// Spawn petals at interval
setInterval(createPetal, 600);
// Initial burst
for (let i = 0; i < 10; i++) setTimeout(createPetal, i * 180);


/* ===================== */
/*   NO BUTTON SHRINK    */
/* ===================== */
let shrinkCount = 0;

function shrinkNo() {
  const btn = document.getElementById('btnNo');
  shrinkCount++;

  const scale = Math.max(0.25, 1 - shrinkCount * 0.15);
  const opacity = Math.max(0.1, 1 - shrinkCount * 0.12);

  btn.style.transform = `scale(${scale})`;
  btn.style.opacity = opacity;
  btn.style.pointerEvents = shrinkCount >= 5 ? 'none' : 'all';

  if (shrinkCount >= 5) {
    btn.style.visibility = 'hidden';
  }
}

function runAway() {
  // If clicked before gone — just shrink more
  shrinkNo();
}


/* ===================== */
/*    YES — LOVE BURST   */
/* ===================== */
const loveEmojis = ['💖', '💕', '💗', '💓', '💞', '💘', '🌹', '✨', '🎉', '💫', '🥰', '😍'];

function handleYes() {
  const overlay = document.getElementById('loveOverlay');
  overlay.classList.add('active');

  // Burst emojis
  launchEmojiRain();

  // Keep raining hearts periodically
  const interval = setInterval(launchEmojiRain, 1400);
  overlay._rainInterval = interval;
}

function launchEmojiRain() {
  const container = document.getElementById('emojiRain');
  const count = 18;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.classList.add('burst-emoji');
      el.textContent = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];

      const startX = Math.random() * 100;
      const startY = 80 + Math.random() * 20;
      el.style.left = startX + 'vw';
      el.style.top = startY + 'vh';
      el.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';

      const delay = Math.random() * 0.4;
      el.style.animationDelay = delay + 's';
      el.style.animationDuration = (Math.random() * 0.8 + 1) + 's';

      container.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    }, i * 60);
  }
}

function closeLove() {
  const overlay = document.getElementById('loveOverlay');
  overlay.classList.remove('active');
  clearInterval(overlay._rainInterval);

  // Final heartbeat on the page
  document.body.style.transition = 'background 1s';
  document.body.style.background = 'linear-gradient(135deg, #fce4ec, #fff0f3)';
}


/* ===================== */
/*  LETTER SCROLL REVEAL */
/* ===================== */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.letter-card, .photo-frame, .decision-section');
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    revealObserver.observe(el);
  });
});

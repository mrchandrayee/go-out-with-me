const $ = (selector) => document.querySelector(selector);
const yesBtn = $('#yesBtn');
const noBtn = $('#noBtn');
const headline = $('#headline');
const actions = $('#actions');
const artWrap = $('#artWrap');
const coupleArt = $('#coupleArt');
const singleBunny = $('#singleBunny');
const yay = $('#yay');
const dateMessage = $('#dateMessage');
const confetti = $('#confetti');

let noMoveCount = 0;
let accepted = false;

function randomPosition(button) {
  const margin = 18;
  const maxX = Math.max(margin, window.innerWidth - button.offsetWidth - margin);
  const maxY = Math.max(margin, window.innerHeight - button.offsetHeight - margin);
  return {
    x: margin + Math.random() * (maxX - margin),
    y: margin + Math.random() * (maxY - margin)
  };
}

// The No button escapes whenever the pointer gets close or it receives focus.
function runAway() {
  if (accepted) return;
  noBtn.classList.add('is-loose');
  const {x, y} = randomPosition(noBtn);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `rotate(${Math.random() * 24 - 12}deg)`;
  noMoveCount++;
  yesBtn.style.transform = `scale(${Math.min(1.45, 1 + noMoveCount * 0.045)})`;
}

noBtn.addEventListener('pointerenter', runAway);
noBtn.addEventListener('focus', runAway);
noBtn.addEventListener('click', event => {
  event.preventDefault();
  runAway();
});

// Touch devices: move the No button before the tap can activate it.
noBtn.addEventListener('touchstart', event => {
  event.preventDefault();
  runAway();
}, {passive:false});

function celebrate() {
  if (accepted) return;
  accepted = true;
  noBtn.classList.remove('is-loose');
  noBtn.style.display = 'none';
  yesBtn.style.display = 'none';
  headline.textContent = 'Yay! It’s a date! 💖';
  headline.classList.add('hidden');
  actions.classList.add('hidden');
  coupleArt.classList.add('hidden');
  singleBunny.classList.remove('hidden');
  yay.classList.remove('hidden');
  dateMessage.classList.remove('hidden');
  artWrap.style.animation = 'bob 1.5s ease-in-out infinite';
  launchConfetti();
}

function launchConfetti() {
  const symbols = ['♥','♡','💗','✦','✿'];
  for (let i = 0; i < 65; i++) {
    const piece = document.createElement('span');
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 1.6}s`;
    piece.style.animationDuration = `${2.2 + Math.random() * 2}s`;
    piece.style.color = ['#f14b68','#ff8ca3','#d47a9a','#8b6caa'][i % 4];
    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}
yesBtn.addEventListener('click', celebrate);

window.addEventListener('resize', () => {
  if (noBtn.classList.contains('is-loose') && !accepted) {
    const {x,y} = randomPosition(noBtn);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }
});

// --------- FRASES (botón-tarjeta) ----------
const frases = [
  "Eres mi parte favorita del día.",
  "Contigo todo se siente más bonito.",
  "Te elegiría una y mil veces.",
  "Mi lugar favorito es a tu lado.",
  "Me haces feliz sin esfuerzo.",
  "Gracias por existir en mi vida.",
  "Tu sonrisa me calma."
];

const btn = document.getElementById("btn");
const mainText = document.getElementById("mainText");

let animando = false;
let lastIndex = -1;

function nextPhrase(){
  let i = Math.floor(Math.random() * frases.length);
  if (frases.length > 1) {
    while (i === lastIndex) i = Math.floor(Math.random() * frases.length);
  }
  lastIndex = i;
  return frases[i];
}

btn.addEventListener("click", () => {
  if (animando) return;

  animando = true;
  btn.disabled = true;

  // salida
  btn.classList.remove("in");
  btn.classList.add("out");

  // entrada
  setTimeout(() => {
    mainText.textContent = nextPhrase();

    btn.classList.remove("out");
    btn.classList.add("in");

    setTimeout(() => {
      animando = false;
      btn.disabled = false;
    }, 380);

  }, 180);
});

// --------- FONDO: CORAZONES LED PARPADEANDO ----------
const canvas = document.getElementById("heartsBg");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", () => {
  resize();
  // reubica corazones al redimensionar para evitar que queden fuera
  initHearts();
});

let hearts = [];

function createHeart(x, y, size){
  // Patrón tipo “matriz LED”
  const pattern = [
    "01100110",
    "11111111",
    "11111111",
    "01111110",
    "00111100",
    "00011000"
  ];

  const pixels = [];
  const dot = size / 8;

  for(let r = 0; r < pattern.length; r++){
    for(let c = 0; c < pattern[r].length; c++){
      if(pattern[r][c] === "1"){
        pixels.push({ x: x + c * dot, y: y + r * dot });
      }
    }
  }

  return {
    pixels,
    dot,
    alpha: 0.3 + Math.random() * 0.7,
    speed: 0.008 + Math.random() * 0.014
  };
}

function initHearts(){
  hearts = [];
  const count = Math.max(10, Math.floor((canvas.width * canvas.height) / 120000));

  for(let i = 0; i < count; i++){
    hearts.push(
      createHeart(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        50 + Math.random() * 60
      )
    );
  }
}

initHearts();

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(const h of hearts){
    h.alpha += h.speed;
    if(h.alpha > 1 || h.alpha < 0.25) h.speed *= -1;

    // blanco suave tipo LED
    ctx.fillStyle = `rgba(255,255,255,${h.alpha})`;

    for(const p of h.pixels){
      ctx.beginPath();
      ctx.arc(p.x, p.y, h.dot/3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

draw();

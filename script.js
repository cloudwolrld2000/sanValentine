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

let lastIndex = -1;
let cambiando = false;

function nextPhrase(){
  let i = Math.floor(Math.random() * frases.length);
  if (frases.length > 1) {
    while (i === lastIndex) {
      i = Math.floor(Math.random() * frases.length);
    }
  }
  lastIndex = i;
  return frases[i];
}

btn.addEventListener("click", () => {
  if (cambiando) return;

  cambiando = true;

  // activar animación de salida
  btn.classList.remove("in");
  btn.classList.add("out");
});

// cuando termina la transición
btn.addEventListener("transitionend", (e) => {

  // Solo reaccionamos cuando termina la opacidad
  if (!btn.classList.contains("out")) return;

  // Cambiar texto
  mainText.textContent = nextPhrase();

  // volver a mostrar
  btn.classList.remove("out");
  btn.classList.add("in");

  cambiando = false;
});


draw();



// ===============================
// ACCORDION (PROJETOS)
// ===============================
function toggleProjeto(element){
  const conteudo = element.nextElementSibling;
  const aberto = conteudo.style.display === "block";

  // Fecha todos
  document.querySelectorAll(".projeto-conteudo").forEach(el=>{
    el.style.display = "none";
  });

  // Remove seta ativa
  document.querySelectorAll(".projeto-titulo").forEach(el=>{
    el.classList.remove("ativo");
  });

  // Se NÃO estava aberto → abre
  if(!aberto){
    conteudo.style.display = "block";
    element.classList.add("ativo");
  }
}

// ===============================
// CAROUSEL
// ===============================
function criarCarousel(imagens, id){
  let i = 0;
  const img = document.getElementById(id);

  // evita erro se não existir
  if(!img) return () => {};

  return function(d){
    i += d;

    if(i < 0) i = imagens.length - 1;
    if(i >= imagens.length) i = 0;

    img.src = imagens[i];
  }
}

// Instâncias dos carrosseis
const trocarImagemJS = criarCarousel(
  ["img1.png","img2.png","img3.png"],
  "img-js"
);

const trocarImagemHTML = criarCarousel(
  ["img11.png","img22.png","img33.png"],
  "img-html"
);

// ===============================
// SWIPE MOBILE (arrastar)
// ===============================
function ativarSwipe(id, trocarFunc){
  const img = document.getElementById(id);
  if(!img) return;

  let startX = 0;

  img.addEventListener("touchstart", (e)=>{
    startX = e.touches[0].clientX;
  });

  img.addEventListener("touchend", (e)=>{
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if(diff > 50){
      trocarFunc(1); // esquerda
    }else if(diff < -50){
      trocarFunc(-1); // direita
    }
  });
}

// ativa swipe
ativarSwipe("img-js", trocarImagemJS);
ativarSwipe("img-html", trocarImagemHTML);

// ===============================
// FALLBACK DE IMAGEM
// ===============================
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    img.src = "https://via.placeholder.com/200x150?text=Imagem";
  });
});

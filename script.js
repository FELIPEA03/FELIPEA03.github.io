function toggleProjeto(element){
  const conteudo = element.nextElementSibling;
  const aberto = conteudo.style.display === "block";

  document.querySelectorAll(".projeto-conteudo").forEach(el=>{
    el.style.display = "none";
  });

  document.querySelectorAll(".projeto-titulo").forEach(el=>{
    el.classList.remove("ativo");
  });

  if(!aberto){
    conteudo.style.display = "block";
    element.classList.add("ativo");
  }
}

/* CAROUSEL */
function criarCarousel(imagens, id){
  let i = 0;
  const img = document.getElementById(id);

  if(!img) return ()=>{};

  return function(d){
    i += d;

    if(i < 0) i = imagens.length - 1;
    if(i >= imagens.length) i = 0;

    img.src = imagens[i];
  }
}

const trocarImagemJS = criarCarousel(
  ["img1.png","img2.png","img3.png"],
  "img-js"
);

const trocarImagemHTML = criarCarousel(
  ["img11.png","img22.png","img33.png"],
  "img-html"
);

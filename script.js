/* CAROUSEL */
function criarCarousel(imagens, id){
  let i = 0;

  return function(d){
    i += d;

    if(i < 0) i = imagens.length - 1;
    if(i >= imagens.length) i = 0;

    document.getElementById(id).src = imagens[i];
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

/* ANIMAÇÃO SCROLL */
const elements = document.querySelectorAll(".fade");

window.addEventListener("scroll", ()=>{
  elements.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight){
      el.classList.add("show");
    }
  });
});

/* CANVAS */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

let particles = [];

for(let i=0;i<80;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:Math.random()*2+1,
    speedX:Math.random()*1-0.5,
    speedY:Math.random()*1-0.5
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle="#58a6ff";
    ctx.fill();

    p.x+=p.speedX;
    p.y+=p.speedY;

    if(p.x<0||p.x>canvas.width) p.speedX*=-1;
    if(p.y<0||p.y>canvas.height) p.speedY*=-1;
  });

  requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", resizeCanvas);


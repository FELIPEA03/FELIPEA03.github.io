const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const goomba = document.querySelector('.goomba');
const start = document.querySelector('.start');
const gameover = document.querySelector('.game-over');
const scoreEl = document.querySelector('.score');

const audioStart = new Audio('./sound/audio_theme.mp3');
const audioGameOver = new Audio('./sound/audio_gameover.mp3');

let gameLoop;
let score = 0;
let pipeScored = false;
let goombaScored = false;

// Função para trocar o fundo conforme o score (7 imagens online)
function updateBackground() {
    const gameEl = document.querySelector('.game');
    let newBackground;

    if (score < 40) {
        newBackground = "url('https://images.unsplash.com/photo-1558981359-219d6364c9a0?auto=format&fit=crop&w=1600&q=80')"; // Mario colorido
    } else if (score >= 40 && score < 80) {
        newBackground = "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=80')"; // Céu estrelado
    } else if (score >= 80 && score < 120) {
        newBackground = "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80')"; // Nebulosa
    } else if (score >= 120 && score < 160) {
        newBackground = "url('https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1600&q=80')"; // Espaço azul
    } else if (score >= 160 && score < 200) {
        newBackground = "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80')"; // Galáxia rosa
    } else if (score >= 200 && score < 240) {
        newBackground = "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80')"; // Espaço profundo
    } else if (score >= 240) {
        newBackground = "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')"; // Universo dourado
    }

    if (gameEl.style.backgroundImage !== newBackground) {
        gameEl.style.backgroundImage = newBackground;
        gameEl.style.backgroundSize = 'cover';
        gameEl.style.backgroundPosition = 'center';
    }
}

// Inicia o jogo
const startGame = () => {
    pipe.classList.add('pipe-animation');
    goomba.classList.add('goomba-animation');
    start.style.display = 'none';

    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.currentTime = 0;
    audioStart.play();

    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    updateBackground();

    pipeScored = false;
    goombaScored = false;

    loop();
};

// Reinicia o jogo
const restartGame = () => {
    gameover.style.display = 'none';
    pipe.style.left = 'initial';
    goomba.style.left = 'initial';
    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';
    mario.style.marginLeft = '0';
    start.style.display = 'none';

    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    updateBackground();

    pipeScored = false;
    goombaScored = false;

    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.currentTime = 0;
    audioStart.play();

    pipe.classList.add('pipe-animation');
    goomba.classList.add('goomba-animation');

    loop();
};

// Faz o Mario pular
const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 800);
    }
};

// Loop do jogo
const loop = () => {
    clearInterval(gameLoop);
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const goombaPosition = goomba.offsetLeft;
        const marioPosition = parseFloat(window.getComputedStyle(mario).bottom.replace('px', ''));

        // Colisão com pipe
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            gameOver();
        }

        // Colisão com goomba
        if (goombaPosition <= 120 && goombaPosition > 0 && marioPosition < 60) {
            gameOver();
        }

        // Pontuação: Mario passou do pipe
        if (!pipeScored && pipePosition < 0) {
            score += 20;
            scoreEl.textContent = `Score: ${score}`;
            pipeScored = true;
            updateBackground();
        }

        // Pontuação: Mario passou do goomba
        if (!goombaScored && goombaPosition < 0) {
            score += 20;
            scoreEl.textContent = `Score: ${score}`;
            goombaScored = true;
            updateBackground();
        }

        // Reset flags
        if (pipePosition > window.innerWidth) pipeScored = false;
        if (goombaPosition > window.innerWidth) goombaScored = false;

    }, 10);
};

// Game Over
const gameOver = () => {
    pipe.classList.remove('pipe-animation');
    goomba.classList.remove('goomba-animation');
    mario.classList.remove('jump');
    mario.src = './img/game-over.png';
    mario.style.width = '80px';
    mario.style.marginLeft = '50px';

    audioStart.pause();
    audioGameOver.play();

    clearInterval(gameLoop);
    gameover.style.display = 'flex';

    setTimeout(() => {
        audioGameOver.pause();
    }, 7000);
};

// Controles
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
    if (e.code === 'Enter') startGame();
});
document.addEventListener('touchstart', () => jump());

// Botões iniciar e reiniciar
start.addEventListener('click', startGame);
document.querySelector('.game-over button').addEventListener('click', restartGame);


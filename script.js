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

// Função para trocar o fundo conforme o score (agora com 10 imagens)
function updateBackground() {
    const gameEl = document.querySelector('.game');
    let newBackground;

    if (score < 40) {
        newBackground = "url('./img/A.JPG')";
    } else if (score >= 40 && score < 80) {
        newBackground = "url('./img/B.JPG')";
    } else if (score >= 80 && score < 120) {
        newBackground = "url('./img/C.PNG')";
    } else if (score >= 120 && score < 160) {
        newBackground = "url('./img/D.JPG')";
    } else if (score >= 160 && score < 200) {
        newBackground = "url('./img/E.JPG')";
    } else if (score >= 200 && score < 240) {
        newBackground = "url('./img/F.JPG')";
    } else if (score >= 240 && score < 280) {
        newBackground = "url('./img/G.JPG')";
    } else if (score >= 280 && score < 320) {
        newBackground = "url('./img/H.JPG')";
    } else if (score >= 320 && score < 360) {
        newBackground = "url('./img/I.JPG')";
    } else if (score >= 360) {
        newBackground = "url('./img/J.JPG')";
    }

    if (gameEl.style.backgroundImage !== newBackground) {
        gameEl.style.backgroundImage = newBackground;
    }
}

// Função para iniciar o jogo
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

// Função para reiniciar o jogo
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

// Função de pular
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
            updateBackground(); // troca de fundo
        }

        // Pontuação: Mario passou do goomba
        if (!goombaScored && goombaPosition < 0) {
            score += 20;
            scoreEl.textContent = `Score: ${score}`;
            goombaScored = true;
            updateBackground(); // troca de fundo
        }

        // Reset flags quando obstáculos voltam
        if (pipePosition > window.innerWidth) pipeScored = false;
        if (goombaPosition > window.innerWidth) goombaScored = false;

    }, 10);
};

// Função de game over
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

// Controles teclado e touch
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
    if (e.code === 'Enter') startGame();
});

document.addEventListener('touchstart', () => {
    jump();
});

// Botões iniciar e reiniciar
start.addEventListener('click', startGame);
document.querySelector('.game-over button').addEventListener('click', restartGame);

const player = document.getElementById("player");
const platforms = document.querySelectorAll(".platform");

let positionX = 40;
let positionY = 120;

let velocityY = 0;
let isJumping = false;

const gravity = 1;
const groundHeight = 120;

// Movimento
document.addEventListener("keydown", (event) => {

  if(event.code === "ArrowRight"){
    positionX += 20;
  }

  if(event.code === "ArrowLeft"){
    positionX -= 20;
  }

  // Pulo na seta pra cima
  if(event.code === "ArrowUp" && !isJumping){
    velocityY = 18;
    isJumping = true;
  }

  player.style.left = positionX + "px";
});

// Game Loop
function gameLoop(){

  velocityY -= gravity;
  positionY += velocityY;

  let onPlatform = false;

  // Colisão com plataformas
  platforms.forEach(platform => {

    const platformLeft = platform.offsetLeft;
    const platformRight = platformLeft + platform.offsetWidth;

    const platformBottom = platform.offsetTop + platform.offsetHeight;
    const platformTop = platform.offsetTop;

    const playerLeft = positionX;
    const playerRight = positionX + 80;

    const playerBottom = window.innerHeight - positionY;
    const playerTop = playerBottom - 80;

    // Detecta pouso
    if(
      playerRight > platformLeft &&
      playerLeft < platformRight &&
      playerBottom <= platformTop + 20 &&
      playerBottom >= platformTop - 20 &&
      velocityY <= 0
    ){
      positionY = window.innerHeight - platformTop;
      velocityY = 0;
      isJumping = false;
      onPlatform = true;
    }

  });

  // Colisão com chão
  if(positionY <= groundHeight){
    positionY = groundHeight;
    velocityY = 0;
    isJumping = false;
  }

  // Se não estiver em plataforma nem chão
  if(positionY > groundHeight && !onPlatform){
    isJumping = true;
  }

  player.style.left = positionX + "px";
  player.style.bottom = positionY + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();
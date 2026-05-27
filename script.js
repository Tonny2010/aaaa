const player = document.getElementById("player");

let positionX = 100;
let velocityY = 0;
let isJumping = false;

const groundHeight = 120;
let positionY = groundHeight;

// Movimento lateral
document.addEventListener("keydown", (event) => {

  if(event.code === "ArrowRight"){
    positionX += 20;
  }

  if(event.code === "ArrowLeft"){
    positionX -= 20;
  }

  // Pulo
  if(event.code === "Space" && !isJumping){
    velocityY = 18;
    isJumping = true;
  }

  player.style.left = positionX + "px";
});

// Gravidade
function gameLoop(){

  velocityY -= 4;

  positionY += velocityY;

  // Limite do chão
  if(positionY <= groundHeight){
    positionY = groundHeight;
    velocityY = 0;
    isJumping = false;
  }

  player.style.bottom = positionY + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();
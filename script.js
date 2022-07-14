const characterSprite = document.querySelector(".main__game-character");
const characterContainer = document.querySelector(".main__character-container");
const floorSprite = document.querySelector(".main__game-floor");
const obstacleContainer = document.querySelector(".main__obstacle-container");
const obstacleSprite = document.querySelector(".main__game-obstacle");
const pointCounter = document.querySelector(".main__point-counter");
const playRetryButton = document.querySelector(".main__play-retry-button");
const gameOverScreen = document.querySelector(".main__game-over-screen");
const gameWindow = document.querySelector(".main__game-window");
const gameBackground = document.querySelector(".main__game-background")

// These functions are called rapidly by a set interval. Iterating through images, giving the affect of animation.
let i = 0;
const animateCharacter = () => {
  characterSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/run-animation/tile00${i}.png`;
  if (i < 5) {
    i += 1;
  } else if ((i = 5)) {
    i -= 5;
  }
}

let j = 0;
const animateFloor = () => {
  floorSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/floor-animation/floor${j}.png`;
  if (j < 3) {
    j += 1;
  } else if ((j = 3)) {
    j -= 3;
  }
};

// When called this function changes the image of an obstacle element hidden off screen and runs a css animation passing the obstacle from right to left.
let l = 0;
let pointCount = 0;
const animateObstacles = () => {
  obstacleSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/obstacles/${l}.png`;
  obstacleContainer.id = "animate-obstacle";
  obstacleContainer.className = `main__obstacle-container main__obstacle-container--${l}`;

  setTimeout(function () {
    obstacleContainer.id = "";
  }, 900);
  l += 1;
  if (l == 6) {
    l -= 6;
  }
  setTimeout(function () {
    pointCount += 10;
  }, 900);

  pointCounter.innerHTML = `POINTS: ${pointCount}`;
}

// On keydown/screen tap or click the run animation is stopped and the image is changed to a jump sprite. If statement adds a class that is animated by css which is removed following a timeout.
const handleJump = (event) => {
  removeJumpEventListeners()
  clearInterval(characterAnimation);
  characterSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/jump-animation/jump0.png`;

  if (characterContainer.id != "animate-jump") {
    characterContainer.id = "animate-jump";
  }
  setTimeout(function () {
    characterContainer.id = "";
    handlePlayRetryPressChar()
    addJumpEventListeners();
  }, 500);
  
};

// Activates set interval functions that animate elements. Removes play/retry screen.
const handlePlayRetryPress = (event) => {
  addJumpEventListeners();
  floorAnimation = setInterval(animateFloor, 50);
  collision = setInterval(checkForCollision, 100);
  obstacleAnimation = setInterval(animateObstacles, 1200);
  gameOverScreen.style.display = "none";
  playRetryButton.style.display = "none";
  characterSprite.style.display = "block";
  obstacleSprite.style.display = "block";
};

// Made this a separate function so that I could call it after a jump occurs. If I just tried to use a standalone setInterval function to restart the run animation it would cause an increase in the animation speed with each jump.
const handlePlayRetryPressChar = (event) => {
   characterAnimation = setInterval(animateCharacter, 100);
}

// Resets to initial game state and shows retry screen, called in the event of a collision.
const gameOver = () => {
  clearInterval(floorAnimation);
  clearInterval(obstacleAnimation);
  clearInterval(characterAnimation);
  playRetryButton.innerText = "Retry";
  gameOverScreen.style.display = "flex";
  playRetryButton.style.display = "block";
  characterSprite.style.display = "none";
  obstacleSprite.style.display = "none";
  pointCount = 0;
  pointCounter.innerText = `POINTS: ${pointCount}`;
};

// a function that essentially creates rectangles around collision items and an if statement that detects these rectangles have overlapped. This signifies collision and calls the gameover function.
const checkForCollision = () => {
  let obstacleHitbox = {
    x: Number(getComputedStyle(obstacleContainer).left.slice(0, -2)),
    y: Number(getComputedStyle(obstacleContainer).bottom.slice(0, -2)),
    width: 50,
    height: 70,
  };

  let characterHitbox = {
    x: Number(getComputedStyle(characterContainer).left.slice(0, -2)),
    y: Number(getComputedStyle(characterContainer).bottom.slice(0, -2)),
    width: 50,
    height: 50,
  };

  if (
    obstacleHitbox.x < characterHitbox.x + characterHitbox.width &&
    obstacleHitbox.x + obstacleHitbox.width > characterHitbox.x &&
    obstacleHitbox.y < characterHitbox.y + characterHitbox.height &&
    obstacleHitbox.y + obstacleHitbox.height > characterHitbox.y
  ) {
    gameOver();
  }
};

const addJumpEventListeners = () => {
  document.addEventListener("keydown", handleJump);
  gameBackground.addEventListener("click", handleJump);
  characterSprite.addEventListener("click", handleJump);
  floorSprite.addEventListener("click", handleJump);
};

const removeJumpEventListeners = () => {
  document.removeEventListener("keydown", handleJump);
  gameBackground.removeEventListener("click", handleJump);
  characterSprite.removeEventListener("click", handleJump);
  floorSprite.removeEventListener("click", handleJump);
};
playRetryButton.addEventListener("click", handlePlayRetryPress);
playRetryButton.addEventListener("click", handlePlayRetryPressChar);


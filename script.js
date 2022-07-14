const characterSprite = document.querySelector(".main__game-character");
const characterContainer = document.querySelector(".main__character-container");
const floorSprite = document.querySelector(".main__game-floor");
const obstacleContainer = document.querySelector(".main__obstacle-container");
const obstacleSprite = document.querySelector(".main__game-obstacle");
const pointCounter = document.querySelector(".main__point-counter");
const playRetryButton = document.querySelector(".main__play-retry-button");
const gameOverScreen = document.querySelector(".main__game-over-screen");
const gameWindow = document.querySelector(".main__game-window");

// cycles through the sprites.
let i = 0;
const animateCharacter = () => {
  characterSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/run-animation/tile00${i}.png`;
  if (i < 5) {
    i += 1;
  } else if ((i = 5)) {
    i -= 5;
  }
}

let l = 0;
let pointCount = 0;
const animateObstacles = () => {
  obstacleSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/obstacles/${l}.png`;
  obstacleContainer.id = "animate-obstacle";
  obstacleContainer.className = `main__obstacle-container main__obstacle-container--${l}`;
  // also have a different class for each item corresponding to the correct css. Because pics come in at diff heights need to change css.
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

let j = 0;
const animateFloor = () => {
  floorSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/floor-animation/floor${j}.png`;
  if (j < 3) {
    j += 1;
  } else if ((j = 3)) {
    j -= 3;
  }
}

const handleJump = (event) => {
  console.log("event triggered");
  clearInterval(characterAnimation);
  characterSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/jump-animation/jump0.png`;

  if (characterContainer.id != "animate-jump") {
    characterContainer.id = "animate-jump";
  }
  setTimeout(function () {
    characterContainer.id = "";
    handlePlayRetryPressChar()
  }, 500);
};

// can process these to get my x and y for collision boxes, on collision we'll add in an element that covers the screen. Then a retry button that sets the points to 0 and clears it. Have difficulty scale with point count.

// left css property is a string, we want it to be a number to use our math on it

const handlePlayRetryPress = (event) => {
  floorAnimation = setInterval(animateFloor, 50);
  collision = setInterval(checkForCollision, 100);
  obstacleAnimation = setInterval(animateObstacles, 1200);
  gameOverScreen.style.display = "none";
  playRetryButton.style.display = "none";
  characterSprite.style.display = "block";
  obstacleSprite.style.display = "block";
};

const handlePlayRetryPressChar = (event) => {
   characterAnimation = setInterval(animateCharacter, 100);
}

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
  console.log(obstacleHitbox.x, characterHitbox.x);
  if (
    obstacleHitbox.x < characterHitbox.x + characterHitbox.width &&
    obstacleHitbox.x + obstacleHitbox.width > characterHitbox.x &&
    obstacleHitbox.y < characterHitbox.y + characterHitbox.height &&
    obstacleHitbox.y + obstacleHitbox.height > characterHitbox.y
  ) {
    gameOver();
  }
};
// be able to explain this

playRetryButton.addEventListener("click", handlePlayRetryPress);
playRetryButton.addEventListener("click", handlePlayRetryPressChar);
document.addEventListener("keydown", handleJump)
gameWindow.addEventListener("click", handleJump);

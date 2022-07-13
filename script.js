const characterSprite = document.querySelector(".main__game-character");
const characterContainer = document.querySelector(".main__character-container");
const floorSprite = document.querySelector(".main__game-floor");
const obstacleContainer = document.querySelector(".main__obstacle-container");
const obstacleSprite = document.querySelector(".main__game-obstacle");
const pointCounter = document.querySelector(".main__point-counter");
const playRetryButton = document.querySelector(".main__play-retry-button")
const gameOverScreen = document.querySelector(".main__game-over-screen")

// cycles through the sprites.
let i = 0;
function animateCharacter() {
  characterSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/run-animation/tile00${i}.png`;
  if (i < 5) {
    i += 1;
  } else if ((i = 5)) {
    i -= 5;
  }
}



let l = 0;
let pointCount = 0;
function animateObstacles() {
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

function animateFloor() {
  floorSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/floor-animation/floor${j}.png`;
  if (j < 3) {
    j += 1;
  } else if ((j = 3)) {
    j -= 3;
  }
}



const handleJump = (event) => {
  console.log("event triggered");
  clearInterval(animateCharacter);
  characterSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/jump-animation/jump0.png`;

  if (characterContainer.id != "animate-jump") {
    characterContainer.id = "animate-jump";
  }
  setTimeout(function () {
    characterContainer.id = "";
  }, 500);
};

document.addEventListener("keydown", function () {
  charRunTimer = clearInterval(animateCharacter);
  handleJump();
});
// can process these to get my x and y for collision boxes, on collision we'll add in an element that covers the screen. Then a retry button that sets the points to 0 and clears it. Have difficulty scale with point count.

// left css property is a string, we want it to be a number to use our math on it
console.dir(
  Number(getComputedStyle(obstacleContainer).left.slice(0, -2)) +
    Number(getComputedStyle(obstacleContainer).left.slice(0, -2))
);

const handlePlayRetryPress = (event) => {
  setInterval(animateFloor, 50);
  setInterval(checkForCollision, 100);
  setInterval(animateObstacles, 1200);
  setInterval(animateCharacter, 100);
  gameOverScreen.remove(
  playRetryButton.remove()
  )
}

// const gameOver = () => {
//   setInterval(animateFloor, 10000);
//   setInterval(checkForCollision, 10000);
//   setInterval(animateObstacles, 12000);
//   setInterval(animateCharacter, 10000);
// }

const checkForCollision = () => {
  
  let rect1 = {
    x: Number(getComputedStyle(obstacleContainer).left.slice(0, -2)),
    y: Number(getComputedStyle(obstacleContainer).bottom.slice(0, -2)),
    width: 50,
    height: 50,
  };

  let rect2 = {
    x: Number(getComputedStyle(characterContainer).left.slice(0, -2)),
    y: Number(getComputedStyle(characterContainer).bottom.slice(0,-2)),
    width: 50,
    height: 50,
  };
  console.log(rect1.x, rect2.x)
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    gameOver()
  }
};
// be able to explain this





playRetryButton.addEventListener("click", handlePlayRetryPress)
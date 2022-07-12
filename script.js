const characterSprite = document.querySelector(".main__game-character");
const characterContainer = document.querySelector(".main__character-container");
const floorSprite = document.querySelector(".main__game-floor");
const obstacleContainer = document.querySelector(".main__obstacle-container")
const obstacleSprite = document.querySelector(".main__game-obstacle")

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

let charRunTimer = setInterval(animateCharacter, 100);

let l = 0;

function animateObstacles() {
  obstacleSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/obstacles/${l}.png`;
  obstacleContainer.id = "animate-obstacle"
  // also have a different class for each item corresponding to the correct css. Because pics come in at diff heights need to change css.
  setTimeout(function () {
    obstacleContainer.id = "";
  }, 900);
  l += 1
  console.log(l)
  if (l == 6) {
    l -= 6
  }
}

setInterval(animateObstacles, 1200)



let j = 0;

function animateFloor() {
  floorSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/floor-animation/floor${j}.png`;
  if (j < 3) {
    j += 1;
  } else if ((j = 3)) {
    j -= 3;
  }
}

setInterval(animateFloor, 50);

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

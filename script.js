const characterSprite = document.querySelector(".main__game-character");
const floorSprite = document.querySelector(".main__game-floor");

let i = 0;
function animateCharacter() {
  characterSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/run-animation/tile00${i}.png`;
  if (i < 5) {
    i += 1;
  } else if ((i = 5)) {
    i -= 5;
  }
}

setInterval(animateCharacter, 100);

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

let k = 0
const handleJump = (event) => {
    clearInterval(animateCharacter)

}


document.addEventListener("keydown", handleJump)
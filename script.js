const characterSprite = document.querySelector(".main__game-character");


let i = 0
function animateCharacter() {
    characterSprite.src = `./craftpix-net-798594-free-green-zone-tileset-pixel-art/Assets/run-animation/tile00${i}.png`
    if (i<6) {
        i += 1
    } else if (i=6) {
        i -= 6
    }
}

setInterval(animateCharacter(), 1000)
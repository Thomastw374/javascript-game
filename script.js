const characterSprite = document.querySelector(".main__game-character");
const floorSprite = document.querySelector(".main__game-floor");
let charPositionY = document.getElementById("game-character");

console.log(getComputedStyle(charPositionY).getPropertyValue('bottom'))

// since these are the COMPUTED styles you'll get back the bottom style in px

// function jumpIfElse() {
//   if (k < 10) {
//     charPositionY = 33.5 + k + "%";
//   } else if (k > 10) {
//     charPositionY = 43.5 - k + "%";
//   }
// }

// let k = 0;
// const handleJump = (event) => {
//   console.log("event triggered")
//   setInterval(jumpIfElse, 1000)
  
// }


// document.addEventListener("keypress", handleJump);

let k = 0
const handleJump = (event) => {
  console.log("event triggered")
  console.log(charPositionY)
  
  

  // charPositionY.style.setProperty("bottom", 33.5 + 20 + "%");
}

function jumpIfElse() {
  if (k < 10) {
    charPositionY.style.setProperty("bottom", 33.5 + k + "%");
  } else if (k > 10) {
    charPositionY.style.setProperty("bottom", 43.5 - (k - 10) + "%");
  } else if ((k = 20)) {
    k -= 20;
  }
}

setInterval(jumpIfElse, 1000);

document.addEventListener("keypress", handleJump);
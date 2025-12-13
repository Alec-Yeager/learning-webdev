export {};

import { GridGame } from "./gridgame.js";
let gridGame = new GridGame();

window.addEventListener("keydown", (event) => {
  //   console.log(`Key pressed: ${event.key}`);
  let dx = 0;
  let dy = 0;
  switch (event.key) {
    case "ArrowUp":
    case "w":
      dy = -1;
      break;
    case "ArrowDown":
    case "s":
      dy = 1;
      break;
    case "ArrowLeft":
    case "a":
      dx = -1;
      break;
    case "ArrowRight":
    case "d":
      dx = 1;
      break;
    default:
      return; // exit this handler for other keys
  }
  gridGame.movePlayer(dx, dy);
});

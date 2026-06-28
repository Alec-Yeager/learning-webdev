export { };

import { GridGame } from "./game/gridgame.js";
import { InputHandler } from "./game/input.js";

let inputHandler = new InputHandler();
let gridGame = new GridGame(inputHandler);

window.addEventListener("keydown", inputHandler.handle);

gridGame.startGame();

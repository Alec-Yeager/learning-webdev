import { GameGrid } from "./world/index.js";

export class GridGame {
  grid: GameGrid;
  constructor() {
    this.grid = new GameGrid(25);
  }
}

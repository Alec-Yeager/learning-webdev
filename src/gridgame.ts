import { GameGrid } from "./world/index.js";

export class GridGame {
  grid: GameGrid;
  constructor() {
    this.grid = new GameGrid(25);
  }

  movePlayer(dx: number, dy: number): void {
    // Handle player movement
    const size = this.grid.size;
    const currentLocation = this.grid.playerLocation;
    const currentX = currentLocation % size;
    const currentY = Math.floor(currentLocation / size);
    const newX = currentX + dx;
    const newY = currentY + dy;

    // Check bounds
    if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
      return; // Out of bounds, do nothing
    }

    if (this.grid.getTile(newX, newY).entity !== null) {
      return; // Tile occupied, do nothing for now. This will be combat or interaction later.
    }

    this.grid.movePlayerTo(newX, newY);
  }
}

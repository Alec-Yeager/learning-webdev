import type { Point } from "./util/point.js";
import { GameGrid } from "./world/index.js";
import { WorldMapGenerator, Zone } from "./world/zone.js";

export class GridGame {
  gamegrid: GameGrid;
  playerpos: Point = { x: 0, y: 0 };
  width: number = 100;
  height: number = 50;
  worldmap: Zone;

  constructor() {
    this.gamegrid = new GameGrid(this.width, this.height);
    console.log("Generating world map...");
    this.worldmap = new WorldMapGenerator().generate(this.width, this.height);
  }

  movePlayer(dx: number, dy: number): void {
    // Handle player movement
    const newX = this.playerpos.x + dx;
    const newY = this.playerpos.y + dy;

    // Check bounds
    if (newX < 0 || newX >= this.width || newY < 0 || newY >= this.height) {
      return; // Out of bounds, do nothing
    }

    this.setPlayerPos(newX, newY);
  }

  setPlayerPos(x: number, y: number) {
    this.playerpos = { x: x, y: y };
    this.gamegrid.movePlayerTo(x, y);
  }

  startGame(): void {
    this.gamegrid.loadZone(this.worldmap);
    this.setPlayerPos(Math.floor(this.width / 2), Math.floor(this.height / 2));
  }
}

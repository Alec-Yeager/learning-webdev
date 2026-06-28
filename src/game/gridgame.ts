import { ControlComponent, PlayerControlComponent } from "../component/control.js";
import { HealthComponent } from "../component/healthcomponent.js";
import { Entity } from "../entities/entity.js";
import type { Point } from "../util/point.js";
import { GameGrid } from "../world/index.js";
import { WorldMapGenerator, Zone } from "../world/zone.js";
import type { InputHandler } from "./input.js";

export class GridGame {
  gamegrid: GameGrid;
  playerpos: Point = { x: 0, y: 0 };
  width: number = 100;
  height: number = 50;
  worldmap: Zone;
  player : Entity;

  constructor(private readonly inputHandler : InputHandler) {
    this.gamegrid = new GameGrid(this.width, this.height);
    console.log("Generating world map...");
    this.worldmap = new WorldMapGenerator().generate(this.width, this.height);
    var playerController = new PlayerControlComponent();
    this.player = new Entity(new HealthComponent(10), playerController);

    playerController.turnTaken.attach(this.playerTurnTaken)
    inputHandler.downPressed.attach(playerController.moveDown)
    inputHandler.upPressed.attach(playerController.moveUp)
    inputHandler.leftPressed.attach(playerController.moveLeft)
    inputHandler.rightPressed.attach(playerController.moveRight)
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

  playerTurnTaken = () => {

  }
}

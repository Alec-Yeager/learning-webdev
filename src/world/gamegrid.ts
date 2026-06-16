import type { Point } from "../util/point.js";
import { PerlinNoiseGenerator } from "./noise.js";
import { DisplayTile } from "./displaytile.js";
import { Tile } from "./tile.js";
import { Zone } from "./zone.js";

export class GameGrid {
  playerLocation: number;
  dtiles: DisplayTile[] = [];
  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {
    this.playerLocation = 0;
    this.constructGrid();
  }

  constructGrid(): void {
    const grid = document.getElementById("gamegrid");
    if (!grid) {
      throw new Error("Game grid element not found in DOM");
    }

    const cellsize =
      (Math.min(window.innerWidth, window.innerHeight) * 0.79) /
      Math.min(this.width, this.height);
    grid.style.gridTemplateColumns = `repeat(${this.width}, ${cellsize}px)`;
    grid.style.gridTemplateRows = `repeat(${this.height}, ${cellsize}px)`;

    const gridFrag = document.createDocumentFragment();

    console.log("Generating tiles...");
    for (let i = 0; i < this.width * this.height; i++) {
      const tile = new DisplayTile();
      this.dtiles.push(tile);
      gridFrag.appendChild(tile.getDiv());
    }

    grid.appendChild(gridFrag);

    this.getTileFlat(this.playerLocation).setPlayer();
  }

  getTileFlat(index: number): DisplayTile {
    if (!(index >= 0 && index < this.width * this.height)) {
      throw new RangeError("Index out of bounds");
    }
    let tile = this.dtiles[index];
    if (!tile) {
      throw new Error("Tile not found at index " + index);
    }
    return tile;
  }

  getTile(x: number, y: number): DisplayTile {
    if (!(x >= 0 && x < this.width && y >= 0 && y < this.height)) {
      throw new RangeError("Coordinates out of bounds");
    }
    try {
      let tile = this.getTileFlat(y * this.width + x);
      return tile;
    } catch (e) {
      console.error(e);
      throw new RangeError("Coordinates out of bounds");
    }
  }

  getPointFromIndex(index: number): Point {
    if (!(index >= 0 && index < this.width * this.height)) {
      throw new RangeError("Index out of bounds");
    }
    return { x: index % this.width, y: Math.floor(index / this.height) };
  }

  getIndexFromPoint(x: number, y: number): number {
    if (!(x >= 0 && x < this.width && y >= 0 && y < this.height)) {
      throw new RangeError("Index out of bounds");
    }
    return y * this.width + x;
  }

  movePlayerTo(x: number, y: number): void {
    this.getTileFlat(this.playerLocation).unsetPlayer();
    this.getTile(x, y).setPlayer();
    this.playerLocation = y * this.width + x;
  }

  loadZone(zone: Zone): void {
    if (zone.tiles.length != this.dtiles.length) {
      throw new Error("Zone not the same size as grid");
    }
    for (let i = 0; i < zone.tiles.length; ++i) {
      this.dtiles[i]!.clear();
      this.dtiles[i]!.addCssClasses(zone.tiles[i]!.classes);
    }
    this.setCorners();
  }

  setCorners(): void {
    this.getTileFlat(0).getDiv().classList.add("topleft");
    this.getTile(this.width - 1, 0)
      .getDiv()
      .classList.add("topright");
    this.getTile(0, this.height - 1)
      .getDiv()
      .classList.add("bottomleft");
    this.getTile(this.width - 1, this.height - 1)
      .getDiv()
      .classList.add("bottomright");
  }
}

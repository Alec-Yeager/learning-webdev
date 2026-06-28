import type { Point } from "../util/point.js";
import { PerlinNoiseGenerator } from "../world/noise.js";
import { TileView } from "./tileview.js";
import { Tile } from "../world/tile.js";
import { Zone } from "../world/zone.js";

export class ZoneView {
  playerLocation: number;
  dtiles: TileView[] = [];
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
      const tile = new TileView();
      this.dtiles.push(tile);
      gridFrag.appendChild(tile.getDiv());
    }

    grid.appendChild(gridFrag);
  }

  getTile(x: number, y: number): TileView {
    if (!(x >= 0 && x < this.width && y >= 0 && y < this.height)) {
      throw new RangeError("Coordinates out of bounds");
    }
    try {
      let tile = this.dtiles[y * this.width + x]!;
      return tile;
    } catch (e) {
      console.error(e);
      throw new RangeError("Coordinates out of bounds");
    }
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
    this.getTile(0, 0).getDiv().classList.add("topleft");
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

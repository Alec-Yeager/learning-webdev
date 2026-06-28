import type { Tile } from "../world/tile.js";

export class TileView {
  tileDiv: HTMLDivElement;
  tile : Tile | undefined = undefined;
  constructor() {
    this.tileDiv = document.createElement("div");
    this.tileDiv.classList.add("tile", "blanktile");
  }

  getDiv(): HTMLDivElement {
    return this.tileDiv;
  }

  // Undo this later
  setPlayer(): void {
    this.tileDiv.classList.add("player");
  }

  // Undo this later
  unsetPlayer(): void {
    this.tileDiv.classList.remove("player");
  }

  clear(): void {
    this.tileDiv.className = "tile";
  }

  addCssClasses(s: string[]): void {
    this.tileDiv.classList.add(...s);
  }

  setTile(tile: Tile) {
    if (this.tile != undefined)
    {
      this.tile.stateChanged.detach(this.render);
    }
    this.tile = tile;
    tile.stateChanged.attach(this.render);
  }

  // This is the render method
  render = () => {

  }
}

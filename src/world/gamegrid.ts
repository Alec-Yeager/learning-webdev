import { Tile } from "./tile.js";

export class GameGrid {
  readonly size: number;
  playerLocation: number;
  tiles: Tile[] = [];
  constructor(size: number) {
    this.size = size;
    this.playerLocation =
      this.size % 2 === 1
        ? Math.floor(this.size ** 2 / 2)
        : Math.floor(this.size ** 2 / 2) + Math.floor(this.size / 2);
    this.constructGrid();
  }

  constructGrid(): void {
    const grid = document.getElementById("gamegrid");
    if (!grid) {
      throw new Error("Game grid element not found in DOM");
    }

    grid.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${this.size}, 1fr)`;

    const gridFrag = document.createDocumentFragment();

    for (let i = 0; i < this.size ** 2; i++) {
      const tile = new Tile();
      this.tiles.push(tile);
      gridFrag.appendChild(tile.getDiv());
    }

    grid.appendChild(gridFrag);

    this.getTileFlat(0).getDiv().classList.add("topleft");
    this.getTileFlat(this.size - 1)
      .getDiv()
      .classList.add("topright");
    this.getTileFlat(this.size * (this.size - 1))
      .getDiv()
      .classList.add("bottomleft");
    this.getTileFlat(this.size ** 2 - 1)
      .getDiv()
      .classList.add("bottomright");

    this.getTileFlat(this.playerLocation).setPlayer();
  }

  getTileFlat(index: number): Tile {
    if (!(index >= 0 && index < this.size ** 2)) {
      throw new RangeError("Index out of bounds");
    }
    let tile = this.tiles[index];
    if (!tile) {
      throw new Error("Tile not found at index " + index);
    }
    return tile;
  }

  getTile(x: number, y: number): Tile {
    if (!(x >= 0 && x < this.size && y >= 0 && y < this.size)) {
      throw new RangeError("Coordinates out of bounds");
    }
    try {
      let tile = this.getTileFlat(y * this.size + x);
      return tile;
    } catch (e) {
      console.error(e);
      throw new RangeError("Coordinates out of bounds");
    }
  }

  movePlayerTo(x: number, y: number): void {
    this.getTileFlat(this.playerLocation).unsetPlayer();
    this.getTile(x, y).setPlayer();
    this.playerLocation = y * this.size + x;
  }
}

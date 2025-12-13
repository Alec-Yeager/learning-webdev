export class Tile {
  tileDiv: HTMLDivElement;
  constructor() {
    this.tileDiv = document.createElement("div");
    this.tileDiv.classList.add("tile", "blanktile");
  }

  getDiv(): HTMLDivElement {
    return this.tileDiv;
  }

  setPlayer(): void {
    this.tileDiv.classList.add("player");
  }

  unsetPlayer(): void {
    this.tileDiv.classList.remove("player");
  }
}

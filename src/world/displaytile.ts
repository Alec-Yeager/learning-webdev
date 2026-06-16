export class DisplayTile {
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

  clear(): void {
    this.tileDiv.className = "tile";
  }

  addCssClasses(s: string[]): void {
    this.tileDiv.classList.add(...s);
  }
}

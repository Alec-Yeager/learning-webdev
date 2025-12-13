import { Inventory } from "../inventory/index.js";
export class Player {
  inventory: Inventory;

  constructor() {
    this.inventory = new Inventory();
  }
}

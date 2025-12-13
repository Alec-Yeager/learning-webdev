import { Inventory } from "../inventory/index.js";
import type { Entity } from "./entity.js";
export class Player implements Entity {
  inventory: Inventory;

  constructor() {
    this.inventory = new Inventory();
  }
}

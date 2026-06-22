import type { Entity } from "../entities/entity.js";
import type { Component } from "./component.js";

// This'll be AI and stuff
export abstract class ControlComponent implements Component {
  currenthp: number;
  dead: boolean = false;
  registerAs = ControlComponent;

  constructor(private readonly maxhp: number) {
    this.currenthp = maxhp;
  }
  update(entity: Entity): void {
    this.dead = this.currenthp <= 0;
  }

  receiveDamage(damage: number) {
    this.currenthp -= damage;
  }

  heal(hp: number) {
    this.currenthp = Math.min(this.currenthp + hp, this.maxhp);
  }
}

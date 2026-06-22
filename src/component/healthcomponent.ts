import type { Entity } from "../entities/entity.js";
import type { Component } from "./component.js";

export class HealthComponent implements Component {
  currenthp: number;
  dead: boolean = false;

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

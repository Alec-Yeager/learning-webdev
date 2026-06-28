import type { Entity } from "../entities/entity.js";
import { Component } from "./component.js";
import { Signal } from "../util/observation.js";

export class HealthComponent extends Component {
  currenthp: number;
  dead: boolean = false;
  deadSignal = new Signal<boolean>()

  constructor(private readonly maxhp: number) {
    super();
    this.currenthp = maxhp;
  }

  receiveDamage(damage: number) {
    this.currenthp -= damage;
    this.dead = this.currenthp <= 0;
    this.deadSignal.emit(this.dead);
  }

  heal(hp: number) {
    this.currenthp = Math.min(this.currenthp + hp, this.maxhp);
  }
}

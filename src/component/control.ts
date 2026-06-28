import type { Entity } from "../entities/entity.js";
import { Signal } from "../util/observation.js";
import { Component } from "./component.js";

// This'll be AI and stuff
export abstract class ControlComponent extends Component {
  registerAs = ControlComponent;

  update(): void {
  }

}

export class AIControlComponent extends ControlComponent {

}

export class PlayerControlComponent extends ControlComponent {

  turnTaken = new Signal<void>();

  moveLeft = () => { }
  moveRight = () => { }
  moveUp = () => { }
  moveDown = () => { };
}

import { Entity } from "../entities/entity.js";
export abstract class Component {
  // I define this here for typing because I'm lazy. I know its not memory efficient.
  entity: Entity = new Entity();
  setEntity(e : Entity) {
    this.entity = e;
  }
}

import type { Entity } from "../entities/entity.js";
export interface Component {
  update(entity: Entity): void;
}

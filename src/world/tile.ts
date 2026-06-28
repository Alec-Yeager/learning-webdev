import type { Entity } from "../entities/entity.js";
import { TerrainType, ZoneType } from "./tiletypes.js"
import { Signal } from "../util/observation.js";

export class Tile {
  stateChanged = new Signal<void>();
  zoneType : ZoneType = ZoneType.Empty;
  terrainType : TerrainType = TerrainType.Empty;
  // classes: string[] = [];
  entity: Entity | null = null;


}

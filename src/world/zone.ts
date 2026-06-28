import type { Point } from "../util/point.js";
import { PerlinNoiseGenerator } from "./noise.js";
import type { NoiseGenerator } from "./noise.js";
import { Tile } from "./tile.js";
import { TerrainType } from "./tiletypes.js";

export class Zone {
  occupied: boolean = false;
  tiles: Tile[];

  constructor(private readonly width : number, private readonly height : number)
  {
    this.tiles = Array.from({length: width * height}, () => new Tile())
  } 

  getTileFromIndex(index: number): Tile {
    if (!(index >= 0 && index < this.width * this.height)) {
      throw new RangeError("Index out of bounds");
    }
    let tile = this.tiles[index];
    if (!tile) {
      throw new Error("Tile not found at index " + index);
    }
    return tile;
  }

  getTileFromPoint(p : Point): Tile {
    if (!(p.x >= 0 && p.x < this.width && p.y >= 0 && p.y < this.height)) {
      throw new RangeError("Coordinates out of bounds");
    }
    try {
      let tile = this.getTileFromIndex(p.y * this.width + p.x);
      return tile;
    } catch (e) {
      console.error(e);
      throw new RangeError("Coordinates out of bounds");
    }
  }

  getPointFromIndex(index: number): Point {
    if (!(index >= 0 && index < this.width * this.height)) {
      throw new RangeError("Index out of bounds");
    }
    return { x: index % this.width, y: Math.floor(index / this.height) };
  }

  getIndexFromPoint(p : Point): number {
    if (!(p.x >= 0 && p.x < this.width && p.y >= 0 && p.y < this.height)) {
      throw new RangeError("Index out of bounds");
    }
    return p.y * this.width + p.x;
  }
}

export interface ZoneGenerator {
  generate(w: number, h: number): Zone;
}

export class WorldMapGenerator implements ZoneGenerator {
  noisegen: NoiseGenerator = new PerlinNoiseGenerator();
  generate(w: number, h: number): Zone {
    let zone = new Zone(w,h);
    for (let y = 0; y < h; ++y) {
      for (let x = 0; x < w; ++x) {
        let tile = zone.getTileFromPoint({x:x,y:y});
        let value = this.noisegen.getValue(x, y);
        if (value < 0.15) {
          tile.terrainType = TerrainType.Trench;
        } else if (value < 0.35) {
          tile.terrainType = TerrainType.Water;
        } else if (value < 0.5) {
          tile.terrainType = TerrainType.Lowland;
        } else if (value < 0.8) {
          tile.terrainType = TerrainType.Grassland;
        } else if (value < 0.9) {
          tile.terrainType = TerrainType.Mountain;
        } else {
          tile.terrainType = TerrainType.Peak;
        }
      }
    }
    return zone;
  }
}

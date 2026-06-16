import { PerlinNoiseGenerator } from "./noise.js";
import type { NoiseGenerator } from "./noise.js";
import { Tile } from "./tile.js";

export class Zone {
  tiles: Tile[] = [];
}

export interface ZoneGenerator {
  generate(w: number, h: number): Zone;
}

export class WorldMapGenerator implements ZoneGenerator {
  noisegen: NoiseGenerator = new PerlinNoiseGenerator();
  generate(w: number, h: number): Zone {
    let zone = new Zone();
    for (let y = 0; y < h; ++y) {
      for (let x = 0; x < w; ++x) {
        let tile = new Tile();
        let value = this.noisegen.getValue(x, y);
        if (value < 0.15) {
          tile.classes.push("trench");
        } else if (value < 0.35) {
          tile.classes.push("water");
        } else if (value < 0.5) {
          tile.classes.push("lowland");
        } else if (value < 0.8) {
          tile.classes.push("grassland");
        } else if (value < 0.9) {
          tile.classes.push("mountain");
        } else {
          tile.classes.push("peak");
        }
        zone.tiles.push(tile);
      }
    }
    return zone;
  }
}

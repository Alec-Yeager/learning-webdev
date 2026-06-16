import type { Vec2 } from "../util/index.js";
import { dot, SeededRandom } from "../util/index.js";

export interface NoiseGenerator {
  // Gets the noise value
  getValue(x: number, y: number): number;
}

export class PerlinNoiseGenerator implements NoiseGenerator {
  // terrain: number[][] = [];
  permutation: Uint8Array = new Uint8Array(256 * 2);
  samplingScale = 0.1;

  constructor(private readonly seed: number = Math.random()) {
    console.log("Constructing terrain...");
    this.constructPerlinPermutation();
  }
  getValue(x: number, y: number): number {
    return this.perlin(x * this.samplingScale, y * this.samplingScale);
  }

  protected perlin(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const topRight: Vec2 = { x: xf - 1.0, y: yf - 1.0 };
    const topLeft: Vec2 = { x: xf, y: yf - 1.0 };
    const bottomRight: Vec2 = { x: xf - 1.0, y: yf };
    const bottomLeft: Vec2 = { x: xf, y: yf };

    // The corners must ALL get the same value, since they're the wrapping point.
    const valueTopRight = this.permutation[this.permutation[X + 1]! + Y + 1]!;
    const valueTopLeft = this.permutation[this.permutation[X]! + Y + 1]!;
    const valueBottomRight = this.permutation[this.permutation[X + 1]! + Y]!;
    const valueBottomLeft = this.permutation[this.permutation[X]! + Y]!;

    const dotTopRight = dot(topRight, this.getConstantVector(valueTopRight));
    const dotTopLeft = dot(topLeft, this.getConstantVector(valueTopLeft));
    const dotBottomRight = dot(
      bottomRight,
      this.getConstantVector(valueBottomRight),
    );
    const dotBottomLeft = dot(
      bottomLeft,
      this.getConstantVector(valueBottomLeft),
    );

    const u = this.fade(xf);
    const v = this.fade(yf);

    const res = this.lerp(
      u,
      this.lerp(v, dotBottomLeft, dotTopLeft),
      this.lerp(v, dotBottomRight, dotTopRight),
    );

    // console.log(`Returning ${res} from perlin`);
    return (res + 1) / 2;
  }

  protected constructPerlinPermutation(): void {
    const halfPerm = new Uint8Array(256);
    for (let i = 0; i < 256; ++i) {
      halfPerm[i] = i;
    }
    let rng = new SeededRandom(this.seed);
    for (let i = 0; i < 256; ++i) {
      let j = rng.nextRange(0, 255);
      // This exclamation point marks I know that this isn't null.
      let tmp: number = halfPerm[j]!;
      halfPerm[j] = halfPerm[i]!;
      halfPerm[i] = tmp;
    }
    this.permutation.set(halfPerm, 0);
    this.permutation.set(halfPerm, 256);
  }

  protected getConstantVector(v: number): Vec2 {
    // Interesting way of doing modulus for powers of 2.
    const h = v & 3;
    if (h === 0) return { x: 1.0, y: 1.0 };
    else if (h === 1) return { x: -1.0, y: 1.0 };
    else if (h === 2) return { x: -1.0, y: -1.0 };
    else return { x: 1.0, y: -1.0 };
  }

  // standard lerp
  protected lerp(t: number, a1: number, a2: number): number {
    return a1 + t * (a2 - a1);
  }

  protected fade(t: number) {
    // this somehow generates an eased version of the input.
    return ((6 * t - 15) * t + 10) * t * t * t;
  }
}

// Yoinked this from AI.
export class SeededRandom {
  constructor(private seed: number) {}

  // Returns a pseudo-random float between 0 and 1
  public next(): number {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Returns a pseudo-random integer within a specific range [min, max]
  public nextRange(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

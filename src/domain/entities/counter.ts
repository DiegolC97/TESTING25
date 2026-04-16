/**
 * Counter Entity.
 * Owns and enforces all counter business rules:
 *   - count is initialised at 0
 *   - count is capped at MAX (1000)
 *   - count is floored at MIN (-1000)
 */
export class Counter {
  static readonly MIN = -1000;
  static readonly MAX = 1000;

  private _count: number;

  private constructor(count: number) {
    this._count = count;
  }

  /**
   * Factory method — creates a Counter initialised at 0.
   */
  static create(): Counter {
    return new Counter(0);
  }

  get count(): number {
    return this._count;
  }

  /**
   * Adds 1 to the current count, capped at MAX.
   */
  increment(): void {
    if (this._count < Counter.MAX) {
      this._count += 1;
    }
  }

  /**
   * Subtracts 1 from the current count, floored at MIN.
   */
  decrement(): void {
    if (this._count > Counter.MIN) {
      this._count -= 1;
    }
  }

  /**
   * Resets the count back to 0.
   */
  reset(): void {
    this._count = 0;
  }

  /**
   * Multiplies the current count by 2, clamped to [MIN, MAX].
   */
  multiplyByTwo(): void {
    const result = this._count * 2;
    if (result > Counter.MAX) {
      this._count = Counter.MAX;
    } else if (result < Counter.MIN) {
      this._count = Counter.MIN;
    } else {
      this._count = result;
    }
  }

  /**
   * Returns a new Counter instance with the same count value.
   * Used by consumers that need immutable snapshots (e.g. React state).
   */
  clone(): Counter {
    return new Counter(this._count);
  }
}

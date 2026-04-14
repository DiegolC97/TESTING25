/**
 * Port interface for ID generation.
 * Infrastructure provides the concrete implementation.
 */
export interface IdGenerator {
  generate(): string;
}

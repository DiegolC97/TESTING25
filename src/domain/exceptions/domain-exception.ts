/**
 * Base exception for all domain-level errors.
 * All domain exceptions should extend this class.
 */
export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

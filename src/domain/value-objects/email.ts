import { InvalidEmailException } from '../exceptions/invalid-email.exception';

/**
 * Email Value Object.
 * Immutable. Validated on construction. Equality by value.
 */
export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Factory method that validates and creates an Email value object.
   * @throws InvalidEmailException if the email format is invalid
   */
  static create(value: string): Email {
    if (!value || !Email.isValid(value)) {
      throw new InvalidEmailException(value);
    }
    return new Email(value.toLowerCase().trim());
  }

  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

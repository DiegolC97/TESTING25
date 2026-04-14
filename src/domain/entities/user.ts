import { Email } from '../value-objects/email';

/**
 * User Entity.
 * Has identity (id) and lifecycle. Protects its own invariants.
 */
export class User {
  private readonly _id: string;
  private _name: string;
  private _email: Email;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(id: string, name: string, email: Email, createdAt: Date, updatedAt: Date) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  /**
   * Factory method for creating a new User entity.
   * Validates invariants during construction.
   */
  static create(params: { id: string; name: string; email: Email }): User {
    const { id, name, email } = params;

    if (!id || id.trim().length === 0) {
      throw new Error('User id cannot be empty');
    }

    if (!name || name.trim().length === 0) {
      throw new Error('User name cannot be empty');
    }

    const now = new Date();
    return new User(id, name.trim(), email, now, now);
  }

  /**
   * Reconstitution method for hydrating from persistence.
   * Bypasses certain creation-time validations.
   */
  static reconstitute(params: {
    id: string;
    name: string;
    email: Email;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(params.id, params.name, params.email, params.createdAt, params.updatedAt);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  changeName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('User name cannot be empty');
    }
    this._name = newName.trim();
    this._updatedAt = new Date();
  }

  changeEmail(newEmail: Email): void {
    this._email = newEmail;
    this._updatedAt = new Date();
  }
}

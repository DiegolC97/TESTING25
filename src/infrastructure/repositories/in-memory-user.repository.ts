import { User } from '@domain/entities';
import { Email } from '@domain/value-objects';
import type { UserRepository } from '@domain/repositories';

/**
 * In-memory implementation of UserRepository.
 * Suitable for development, testing, and prototyping.
 * Replace with a database-backed implementation for production.
 */
export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, UserRecord> = new Map();

  async findById(id: string): Promise<User | null> {
    const record = this.users.get(id);
    if (!record) return null;
    return this.toDomain(record);
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase().trim();
    for (const record of this.users.values()) {
      if (record.email === normalizedEmail) {
        return this.toDomain(record);
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    const records = Array.from(this.users.values());
    return records.map((record) => this.toDomain(record));
  }

  async save(user: User): Promise<void> {
    this.users.set(user.id, this.toRecord(user));
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }

  /**
   * Maps an internal storage record back to a domain entity.
   */
  private toDomain(record: UserRecord): User {
    return User.reconstitute({
      id: record.id,
      name: record.name,
      email: Email.create(record.email),
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
    });
  }

  /**
   * Maps a domain entity to an internal storage record.
   */
  private toRecord(user: User): UserRecord {
    return {
      id: user.id,
      name: user.name,
      email: user.email.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}

/**
 * Internal persistence record shape.
 * Never exposed outside infrastructure.
 */
interface UserRecord {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

import { User } from '../entities/user';

/**
 * Repository interface for User entity persistence.
 * Describes WHAT operations are available, not HOW they are implemented.
 * Implementations live in the infrastructure layer.
 */
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

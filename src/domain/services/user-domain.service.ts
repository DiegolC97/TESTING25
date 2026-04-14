import { User } from '../entities/user';

/**
 * Domain Service for User-related logic that doesn't naturally
 * belong to a single User entity.
 */
export class UserDomainService {
  /**
   * Checks if a user with the given email already exists in the provided list.
   * This is domain logic because uniqueness is a business rule.
   */
  isEmailUniqueAmong(email: string, existingUsers: User[]): boolean {
    return !existingUsers.some((user) => user.email.toString() === email.toLowerCase());
  }
}

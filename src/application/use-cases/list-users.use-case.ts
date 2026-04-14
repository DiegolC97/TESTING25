import type { UserRepository } from '@domain/repositories';
import type { ListUsersOutputDto } from '../dtos';
import { UserMapper } from '../mappers';

/**
 * ListUsers Use Case.
 * Retrieves all users.
 */
export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<ListUsersOutputDto> {
    const users = await this.userRepository.findAll();

    return {
      users: users.map(UserMapper.toListItem),
      total: users.length,
    };
  }
}

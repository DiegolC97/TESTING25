import type { UserRepository } from '@domain/repositories';
import { UserNotFoundException } from '@domain/exceptions';
import type { GetUserInputDto, GetUserOutputDto } from '../dtos';
import { UserMapper } from '../mappers';

/**
 * GetUser Use Case.
 * Retrieves a single user by ID.
 */
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: GetUserInputDto): Promise<GetUserOutputDto> {
    const user = await this.userRepository.findById(dto.id);

    if (!user) {
      throw new UserNotFoundException(dto.id);
    }

    return UserMapper.toGetOutput(user);
  }
}

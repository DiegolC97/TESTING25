import { User } from '@domain/entities';
import { Email } from '@domain/value-objects';
import type { UserRepository } from '@domain/repositories';
import { DomainException } from '@domain/exceptions';
import type { CreateUserInputDto, CreateUserOutputDto } from '../dtos';
import type { IdGenerator } from '../ports';
import { UserMapper } from '../mappers';

/**
 * CreateUser Use Case.
 * Orchestrates the creation of a new user.
 * Receives dependencies via constructor injection.
 */
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(dto: CreateUserInputDto): Promise<CreateUserOutputDto> {
    // Check for existing user with the same email
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new DomainException(`A user with email "${dto.email}" already exists`);
    }

    // Create domain value objects and entity
    const email = Email.create(dto.email);
    const id = this.idGenerator.generate();

    const user = User.create({ id, name: dto.name, email });

    // Persist through repository
    await this.userRepository.save(user);

    // Return DTO, never domain entity
    return UserMapper.toCreateOutput(user);
  }
}

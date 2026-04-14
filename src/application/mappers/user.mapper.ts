import { User } from '@domain/entities';
import type { CreateUserOutputDto, GetUserOutputDto, UserListItemDto } from '../dtos';

/**
 * Maps domain User entities to application DTOs.
 * Never exposes domain entities outside the application layer.
 */
export class UserMapper {
  static toCreateOutput(user: User): CreateUserOutputDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email.toString(),
      createdAt: user.createdAt.toISOString(),
    };
  }

  static toGetOutput(user: User): GetUserOutputDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  static toListItem(user: User): UserListItemDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email.toString(),
      createdAt: user.createdAt.toISOString(),
    };
  }
}

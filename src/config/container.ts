/**
 * Composition Root / Dependency Injection Container.
 *
 * This file lives outside clean architecture layers because it must
 * know about ALL layers to wire dependencies together.
 * It is the only place where infrastructure meets application.
 */
import { InMemoryUserRepository } from '@infrastructure/repositories';
import { CryptoIdGenerator } from '@infrastructure/adapters';
import { CreateUserUseCase, GetUserUseCase, ListUsersUseCase } from '@application/use-cases';

// -- Infrastructure instances (singletons for the lifetime of the app) --
const userRepository = new InMemoryUserRepository();
const idGenerator = new CryptoIdGenerator();

// -- Use case factories --
// Each call returns a new use case instance wired with its dependencies.

export function makeCreateUserUseCase(): CreateUserUseCase {
  return new CreateUserUseCase(userRepository, idGenerator);
}

export function makeGetUserUseCase(): GetUserUseCase {
  return new GetUserUseCase(userRepository);
}

export function makeListUsersUseCase(): ListUsersUseCase {
  return new ListUsersUseCase(userRepository);
}

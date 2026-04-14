import { NextRequest, NextResponse } from 'next/server';
import type { CreateUserInputDto } from '@application/dtos';
import { makeCreateUserUseCase, makeListUsersUseCase } from '../../../config';

/**
 * User API Controller.
 * Thin layer: validate input → call use case → serialize output.
 * No business logic here.
 */

export async function handleListUsers(): Promise<NextResponse> {
  try {
    const useCase = makeListUsersUseCase();
    const result = await useCase.execute();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function handleCreateUser(request: NextRequest): Promise<NextResponse> {
  try {
    // Input validation (schema-level, not business rules)
    const body = await request.json();

    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Validation failed', message: '"name" is required and must be a string' },
        { status: 400 },
      );
    }

    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Validation failed', message: '"email" is required and must be a string' },
        { status: 400 },
      );
    }

    const dto: CreateUserInputDto = {
      name: body.name,
      email: body.email,
    };

    const useCase = makeCreateUserUseCase();
    const result = await useCase.execute(dto);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

/**
 * Translates application/domain exceptions into HTTP responses.
 */
function handleError(error: unknown): NextResponse {
  if (error instanceof Error) {
    const name = error.name;

    if (name === 'InvalidEmailException') {
      return NextResponse.json(
        { error: 'Validation failed', message: error.message },
        { status: 400 },
      );
    }

    if (name === 'UserNotFoundException') {
      return NextResponse.json({ error: 'Not found', message: error.message }, { status: 404 });
    }

    if (name === 'DomainException') {
      return NextResponse.json({ error: 'Conflict', message: error.message }, { status: 409 });
    }
  }

  console.error('Unhandled error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

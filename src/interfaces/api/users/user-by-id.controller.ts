import { NextResponse } from 'next/server';
import type { GetUserInputDto } from '@application/dtos';
import { makeGetUserUseCase } from '../../../config';

/**
 * Controller for single-user operations by ID.
 */

export async function handleGetUser(id: string): Promise<NextResponse> {
  try {
    if (!id || id.trim().length === 0) {
      return NextResponse.json(
        { error: 'Validation failed', message: '"id" parameter is required' },
        { status: 400 },
      );
    }

    const dto: GetUserInputDto = { id };
    const useCase = makeGetUserUseCase();
    const result = await useCase.execute(dto);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown): NextResponse {
  if (error instanceof Error) {
    if (error.name === 'UserNotFoundException') {
      return NextResponse.json({ error: 'Not found', message: error.message }, { status: 404 });
    }
  }

  console.error('Unhandled error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

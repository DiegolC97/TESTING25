import { handleGetUser } from '@interfaces/api/users';

/**
 * GET /api/users/:id — Get a user by ID
 */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  return handleGetUser(params.id);
}

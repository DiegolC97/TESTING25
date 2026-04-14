import { type NextRequest } from 'next/server';
import { handleListUsers, handleCreateUser } from '@interfaces/api/users';

/**
 * GET /api/users — List all users
 */
export async function GET() {
  return handleListUsers();
}

/**
 * POST /api/users — Create a new user
 */
export async function POST(request: NextRequest) {
  return handleCreateUser(request);
}

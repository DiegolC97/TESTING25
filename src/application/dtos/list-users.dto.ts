/**
 * Output DTO for a single user item in a list.
 */
export interface UserListItemDto {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

/**
 * Output DTO returned by the ListUsers use case.
 */
export interface ListUsersOutputDto {
  users: UserListItemDto[];
  total: number;
}

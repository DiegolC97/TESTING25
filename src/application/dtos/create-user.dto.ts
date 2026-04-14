/**
 * Input DTO for the CreateUser use case.
 */
export interface CreateUserInputDto {
  name: string;
  email: string;
}

/**
 * Output DTO returned by the CreateUser use case.
 */
export interface CreateUserOutputDto {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

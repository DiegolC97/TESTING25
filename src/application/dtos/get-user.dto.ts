/**
 * Input DTO for the GetUser use case.
 */
export interface GetUserInputDto {
  id: string;
}

/**
 * Output DTO returned by the GetUser use case.
 */
export interface GetUserOutputDto {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

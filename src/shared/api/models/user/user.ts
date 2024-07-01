import type { BaseResponse } from '../base-response.interface';

export interface UserRequestBody {
  email?: string;
  name?: string;
  password?: string;
}

export interface User {
  email: string;
  name: string;
}

export interface UserResponseBody {
  user: User;
}

export type UserResponse = BaseResponse<UserResponseBody>;

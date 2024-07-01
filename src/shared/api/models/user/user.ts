import type { BaseResponse } from '../base-response.interface';

export interface UserRequestBody {
  email?: string;
  name?: string;
  password?: string;
}

export interface UserResponseBody {
  user: {
    email: string;
    name: string;
  };
}

export type UserResponse = BaseResponse<UserResponseBody>;

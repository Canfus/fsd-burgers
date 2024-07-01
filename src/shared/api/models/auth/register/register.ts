import type { BaseResponse } from '../../base-response.interface';

export interface RegisterRequestBody {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponseBody {
  user: {
    email: string;
    name: string;
  };
  accessToken: `Bearer ${string}`;
  refreshToken: string;
}

export type RegisterResponse = BaseResponse<RegisterResponseBody>;

import type { BaseResponse } from '../../base-response.interface';

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  user: {
    email: string;
    name: string;
  };
  accessToken: `Bearer ${string}`;
  refreshToken: string;
}

export type LoginResponse = BaseResponse<LoginResponseBody>;

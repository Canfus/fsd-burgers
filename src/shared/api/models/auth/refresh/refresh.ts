import type { BaseResponse } from '../../base-response.interface';

export interface RefreshTokenRequestBody {
  token: string;
}

export interface RefreshTokenResponseBody {
  accessToken: `Bearer ${string}`;
  refreshToken: string;
}

export type RefreshTokenResponse = BaseResponse<RefreshTokenResponseBody>;

import type { BaseResponse } from '../../base-response.interface';

export interface ResetPasswordRequestBody {
  password: string;
  token: string;
}

export interface ResetPasswordResponseBody {
  message: string;
}

export type ResetPasswordResponse = BaseResponse<ResetPasswordResponseBody>;

import type { BaseResponse } from '../../base-response.interface';

export interface ForgotPasswordRequestBody {
  email: string;
}

export interface ForgotPasswordResponseBody {
  message: string;
}

export type ForgotPasswordResponse = BaseResponse<ForgotPasswordResponseBody>;

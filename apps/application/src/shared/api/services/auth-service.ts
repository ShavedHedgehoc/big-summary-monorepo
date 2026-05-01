import { AxiosResponse } from 'axios';
import { $api, $clearApi } from '../http';
import { ApiRoutes } from '../http/apiRoutes';
import { IUser } from '../../../modules/auth/store/auth-store';

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export default class AuthService {
  static register = async (dto: RegisterDto): Promise<AxiosResponse<AuthResponse>> => {
    return $api.post<AuthResponse>(ApiRoutes.REGISTER, dto);
  };
  static login = async (dto: LoginDto): Promise<AxiosResponse<AuthResponse>> => {
    return $api.post<AuthResponse>(ApiRoutes.LOGIN, dto);
  };
  static logout = async (): Promise<void> => {
    await $api.post(ApiRoutes.LOGOUT);
  };

  static check = async (): Promise<AxiosResponse<AuthResponse>> => {
    return $api.post<AuthResponse>(ApiRoutes.CHECK);
  };

  static refresh = async (): Promise<AxiosResponse<AuthResponse>> => {
    return $clearApi.post<AuthResponse>(ApiRoutes.REFRESH);
  };
}

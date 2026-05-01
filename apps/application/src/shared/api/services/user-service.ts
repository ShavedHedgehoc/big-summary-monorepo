import { $api } from '../http';

interface IRole {
  id: number;
  value: string;
  description: string;
}

export interface IUserRow {
  id: number;
  name: string;
  email: string;
  banned: boolean;
  roles: IRole[] | [];
  user_settings: IUserSettings | null;
}

/** @public */
export interface IUserResponse {
  rows: IUserRow[];
  total: number;
}

export interface IUpdateUserRolesDto {
  id: number;
  roles: number[];
}

interface IUserSettingsPlant {
  value: string;
}

interface IUserSettings {
  plant_id: number;
  plant: IUserSettingsPlant;
}

interface IUserUpdateSettings {
  plant_id: number;
}

export interface IUpdateUserDto {
  user_id: number;
  name: string;
  email: string;
  user_settings: IUserUpdateSettings | null;
}

export default class UserService {
  static getUsers = async (dto: FetchUsersDto): Promise<IUserResponse> => {
    const res = await $api.post<IUserResponse>(`/users/list`, dto);
    return res.data;
  };
  static updateUserRoles = async (data: IUpdateUserRolesDto): Promise<IUserResponse> => {
    const res = await $api.post<IUserResponse>(`/users/update_roles`, data);
    return res.data;
  };
  static changeBannedStatus = async (id: number): Promise<IUserResponse> => {
    const res = await $api.get<IUserResponse>(`/users/change_banned/${id}`);
    return res.data;
  };

  static getUserById = async (id: number | null): Promise<IUserRow> => {
    const res = await $api.get<IUserRow>(`/users/change_banned/${id}`);
    return res.data;
  };

  static updateUser = async (data: IUpdateUserDto): Promise<any> => {
    const res = await $api.put<any>(`/users`, data);
    return res.data;
  };
}

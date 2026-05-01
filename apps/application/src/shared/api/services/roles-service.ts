import { $api } from '../http';

export default class RoleService {
  static getAllRoles = async (): Promise<IRole[]> => {
    const res = await $api.get<IRole[]>(`/roles`);
    return res.data;
  };
}

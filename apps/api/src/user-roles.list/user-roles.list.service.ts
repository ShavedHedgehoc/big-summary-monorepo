import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { UserRolesService } from '../user-roles/user-roles.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserRolesListService {
  constructor(
    private userRoleService: UserRolesService,
    private roleService: RolesService,
    private userService: UsersService,
  ) {}
  async changeUserRole(userId: number, roleValue: string) {
    const role = await this.roleService.getroleByValue(roleValue);
    const user = await this.userService.getByPk(userId);
    if (!role) {
      throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
    }
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    const roleRecord = await this.userRoleService.getRowByUserIdAndRoleId(user.id, role.id);
    if (roleRecord) {
      await this.userRoleService.removeRecord(roleRecord.id);
      return;
    }
    const newRow = await this.userRoleService.addRecord(user.id, role.id);
    return newRow;
  }
}

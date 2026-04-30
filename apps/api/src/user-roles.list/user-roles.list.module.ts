import { Module } from '@nestjs/common';
import { UserRolesListService } from './user-roles.list.service';
import { UserRolesListController } from './user-roles.list.controller';
import { UserRolesModule } from '../user-roles/user-roles.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  providers: [UserRolesListService],
  controllers: [UserRolesListController],
  imports: [UserRolesModule, UsersModule, RolesModule],
})
export class UserRolesListModule {}

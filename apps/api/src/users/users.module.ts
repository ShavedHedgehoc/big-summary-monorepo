import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import User from './users.model';
import Role from '../roles/roles.model';
import UserRoles from '../user-roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
// import { SeederModule } from "nestjs-sequelize-seeder";
// import { SeedUser } from "src/seeds/user.seed";
// import { SeedRole } from "src/seeds/role.seed";
// import { SeedUserRole } from "src/seeds/userRoles.seed";
import { UserRolesModule } from '../user-roles/user-roles.module';
import { TokenModule } from '../token/token.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    TokenModule,
    UserRolesModule,
    UserSettingsModule,
    forwardRef(() => AuthModule),
    // SeederModule.forFeature([SeedUser]),
  ],
  exports: [UsersService],
})
export class UsersModule {}

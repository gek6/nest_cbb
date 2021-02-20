import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { IndexController } from './index/index.controller';
import { WelcomeController } from './welcome/welcome.controller';
import { AccountController } from './account/account.controller';
import { UserController } from './user/user.controller';

// 在定义 schema后 在控制器所在 module 中定义
import { AdminSchema } from '../../schemas/admin.schema';
import { UserSchema } from '../../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

// 引入服务
import { ToolsService } from '../../service/tools/tools.service';
import { AdminService } from '../../service/admin/admin.service';
import { UserService } from '../../service/user/user.service';
import { JwtAuthService } from '../../service/jwt-auth/jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Admin', schema: AdminSchema, collection: 'admin' },
    { name: 'User', schema: UserSchema, collection: 'user' },
  ]),
    JwtModule.register({
      secret: 'lane-yb',
      signOptions: { expiresIn: (60 * 60 * 24 * 30) + 's' },
    })],
  controllers: [LoginController, IndexController, WelcomeController, AccountController, UserController],
  providers: [JwtAuthService, ToolsService, AdminService, UserService],
})
export class AdminModule {
}

import { Module } from '@nestjs/common';

// 在定义 schema后 在控制器所在 module 中定义
import { UserSchema } from '../../schemas/user.schema';
import { AddressSchema } from '../../schemas/address.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './wxmp/user/user.controller';
// 引入服务
import { UserService } from '../../service/user/user.service';
import { AddressService } from '../../service/address/address.service';
import { JwtAuthService } from '../../service/jwt-auth/jwt-auth.service';
// 引入 JWT
import { JwtModule } from '@nestjs/jwt';
import { AddressController } from './wxmp/address/address.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema, collection: 'user' },
      { name: 'Address', schema: AddressSchema, collection: 'address' },
    ])
    , JwtModule.register({
      secret: 'lane-yb',
      signOptions: { expiresIn: (60 * 60 * 24 * 30) + 's' },
    }),
  ],
  providers: [
    // 在这注册服务
    UserService,
    JwtAuthService,
    AddressService,
  ],
  exports: [JwtAuthService],
  controllers: [UserController, AddressController],
})

export class ApiModule {
}

import { Module } from '@nestjs/common';

// 在定义 schema后 在控制器所在 module 中定义 
import { UserSchema } from "../../schemas/user.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './wxmp/user/user.controller';
// 引入服务
import { UserService } from "../../service/user/user.service"
import { JwtAuthService } from "../../service/jwt-auth/jwt-auth.service"
// 引入 JWT
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: "User", schema: UserSchema, collection: "user" }])
        ,JwtModule.register({
            secret: 'asdasda',
            signOptions: { expiresIn: '20s' },
          }),
    ],
    providers:[
        // 在这注册服务
        UserService,
        JwtAuthService
    ],
    exports:[JwtAuthService],
    controllers: [UserController]
})

export class ApiModule {}

import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { IndexController } from './index/index.controller';
import { WelcomeController } from './welcome/welcome.controller';
import { AccountController } from './account/account.controller';
import { UserController } from './user/user.controller';
import { WorkerController } from './worker/worker.controller';
import { SystemController } from './system/system.controller';
import { BannerController } from './banner/banner.controller';
import { OrderController } from './order/order.controller';
import { PetController } from './pet/pet.controller';
// 在定义 schema后 在控制器所在 module 中定义
import { AdminSchema } from '../../schemas/admin.schema';
import { UserSchema } from '../../schemas/user.schema';
import { WorkerSchema } from "src/schemas/worker.schema";
import { BannerSchema } from "../../schemas/banner.schema";
import { PetSchema } from "../../schemas/pet.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from '../../schemas/address.schema';

// 引入服务
import { ToolsService } from '../../service/tools/tools.service';
import { AdminService } from '../../service/admin/admin.service';
import { UserService } from '../../service/user/user.service';
import { JwtAuthService } from '../../service/jwt-auth/jwt-auth.service';
import { WorkerService } from "src/service/worker/worker.service"
import { BannerService } from "../../service/banner/banner.service"
import { PetService } from "../../service/pet/pet.service"
import { AddressService } from "../../service/address/address.service";


import { JwtModule } from '@nestjs/jwt';
import { AddressController } from './address/address.controller';


@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Admin', schema: AdminSchema, collection: 'admin' },
    { name: 'User', schema: UserSchema, collection: 'user' },
    { name: 'Worker', schema: WorkerSchema, collection: 'worker' },
    { name: 'Banner', schema: BannerSchema, collection: 'banner' },
    { name: 'Pet', schema: PetSchema, collection: 'pet' },
    { name: 'Address', schema: AddressSchema, collection: 'address' },
  ]),
    JwtModule.register({
      secret: 'lane-yb',
      signOptions: { expiresIn: (60 * 60 * 24 * 30) + 's' },
    })],
  controllers: [LoginController, IndexController, WelcomeController, AccountController, UserController, WorkerController, SystemController, BannerController, OrderController, PetController, AddressController],
  providers: [JwtAuthService, ToolsService, AdminService, UserService,WorkerService,BannerService,PetService,AddressService],
})
export class AdminModule {
}

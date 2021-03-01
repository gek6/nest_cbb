import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';// 引入 JWT
import { MongooseModule } from '@nestjs/mongoose';


// schema
import { UserSchema } from '../../schemas/user.schema';
import { AddressSchema } from '../../schemas/address.schema';
import { PetSchema } from "../../schemas/pet.schema"
import { WorkerSchema } from "../../schemas/worker.schema"
import { RechargeSchema } from "../../schemas/recharge.schema"

// 服务
import { UserService } from '../../service/user/user.service';
import { AddressService } from '../../service/address/address.service';
import { JwtAuthService } from '../../service/jwt-auth/jwt-auth.service';
import { PetService } from "../../service/pet/pet.service"
import { WorkerService } from "../../service/worker/worker.service"
import { RechargeService } from "../../service/recharge/recharge.service"
import { PhoneMsgService } from "../../service/phone-msg/phone-msg.service"

// 控制器
import { AddressController } from './wxmp/address/address.controller';
import { PetController } from './wxmp/pet/pet.controller';
import { WorkerController } from './wxmp/worker/worker.controller';
import { UserController } from './wxmp/user/user.controller';
import { SignController } from './qiniu/sign/sign.controller';
import { PayController } from './wxmp/pay/pay.controller';
import { PhoneMsgController } from './wxmp/phone-msg/phone-msg.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema, collection: 'user' },
      { name: 'Address', schema: AddressSchema, collection: 'address' },
      { name: 'Pet', schema: PetSchema, collection: 'pet' },
      { name: 'Worker', schema: WorkerSchema, collection: 'worker' },
      { name: 'Recharge', schema: RechargeSchema, collection: 'recharge' },

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
    PetService,
    WorkerService,
    RechargeService,
    PhoneMsgService
  ],
  exports: [JwtAuthService],
  controllers: [UserController, AddressController, PetController, WorkerController, SignController, PayController, PhoneMsgController],
})

export class ApiModule {
}

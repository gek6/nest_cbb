import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';

import { MongooseModule } from '@nestjs/mongoose';
// 导入 权鉴 中间件
import { AuthMiddleware } from './middleware/admin/auth.middleware';
import { ApiMiddleware } from './middleware/token/api.middleware';
import { CallbackController } from './module/callback/callback.controller';
import { CallbackService } from './service/callback/callback.service';
import { RechargeSchema } from "./schemas/recharge.schema"
import { UserSchema } from "./schemas/user.schema"
@Module({
  imports: [
    AdminModule,
    DefaultModule,
    ApiModule,
    MongooseModule.forRoot('mongodb://82.156.165.162:27017/nest_cbb', { 'useFindAndModify': false }),
    MongooseModule.forFeature([
  
      { name: 'Recharge', schema: RechargeSchema, collection: 'recharge' },
      { name: 'User', schema: UserSchema, collection: 'user' },
      
    ])
  ],
  controllers: [CallbackController],
  providers: [CallbackService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'admin*', method: RequestMethod.ALL });

    consumer
      .apply(ApiMiddleware)
      .forRoutes({ path: 'api*', method: RequestMethod.ALL });
  }
}


import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';

import { MongooseModule } from "@nestjs/mongoose"
// 导入 权鉴 中间件
import { AuthMiddleware } from "./middleware/admin/auth.middleware"


@Module({


  imports: [AdminModule, DefaultModule, ApiModule, MongooseModule.forRoot("mongodb://82.156.165.162:27017/nest_cbb")],



})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
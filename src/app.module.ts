
import { Module } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';

import { MongooseModule } from "@nestjs/mongoose"
@Module({


  imports: [AdminModule, DefaultModule, ApiModule,MongooseModule.forRoot("mongodb://82.156.165.162:27017")]
})
export class AppModule { }

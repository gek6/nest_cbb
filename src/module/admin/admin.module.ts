import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { IndexController } from './index/index.controller';
import { WelcomeController } from './welcome/welcome.controller';
import { AccountController } from './account/account.controller';



// 在定义 schema后 在控制器所在 module 中定义 
import { AdminSchema } from "../../schemas/admin.schema";
import { MongooseModule } from '@nestjs/mongoose';

// 引入服务
import { ToolsService } from '../../service/tools/tools.service';
import { AdminService } from "../../service/admin/admin.service"



@Module({
  imports: [MongooseModule.forFeature([{ name: "Admin", schema: AdminSchema, collection: "admin" }])],
  controllers: [LoginController, IndexController, WelcomeController, AccountController],
  providers: [ToolsService,AdminService]
})
export class AdminModule { }

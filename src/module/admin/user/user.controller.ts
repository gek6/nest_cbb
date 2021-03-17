import { Controller, Get,Render,Query } from '@nestjs/common';

import { UserService } from 'src/service/user/user.service';
import { AdminUrlName } from "../../../../config/admin.config"
@Controller(`${AdminUrlName}/user`)
export class UserController {
  constructor(
    private userService:UserService
  ){

  }
  @Get()
  @Render("admin/mp-user/list")
  __userList(){
    return {

    }
  }

  @Get('user-list-json')
  async __userListApi(
    @Query('page') pageNum: number = 1,
    @Query('limit') pageSize: number = 10,
    @Query('nickname') nickname: string = '',
  ){

    let list = await this.userService.list({
      pageNum,
      pageSize,
      nickname
    })

    // console.log(list);

    return {
      code:0,
      msg:'ok',
      data:list
    }
  }
}

import { Controller, Get,Render,Query } from '@nestjs/common';

import { UserService } from 'src/service/user/user.service';

@Controller('admin/user')
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
    @Query('pageNum') pageNum: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ){

    await this.userService.list({
      pageNum,
      pageSize
    })
    return {
      
    }
  }
}

import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from '../../../../service/user/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from "@nestjs/swagger"
import { UserInfoDto , LoginDto } from "./dto"


@Controller('api/user')
@ApiTags('微信小程序登录')
export class UserController {
  constructor
    (
      private userService: UserService,
  ) {
  }

  @Post('register')
  @ApiOperation({
    summary: "通过code登录",
  })

  async __register(@Body() postBody: LoginDto) {
    let code: string = postBody['code'];
    // 如果code 不存在 给出提示
    if (!code) {
      return {
        code: -1,
        msg: '缺少参数',
      };
    }
    let loginRes = await this.userService.wxmpDoLogin(code);

    if (loginRes.errcode) {
      return loginRes;
    } else {
      console.log(loginRes);
      // 这里拿到用户的openid
      let openid = loginRes.openid;
      // 去数据库中查询
      let res = await this.userService.find({
        openid,
      });

      if (res.length) {
        // 用户存在
        console.log('用户存在');
        let token = await this.userService.createToken(openid);
        return {
          code: 1,
          msg: 'ok',
          token: token,
        };

      } else {
        // 用户不存在
        console.log('用户不存在');
        let token = await this.userService.add({
          openid,
        });

        if (token) {
          // 保存成功
          return {
            code: 1,
            msg: 'ok',
            token: token,
          };
        }
      }


    }

  }

  @Get('info')
  @ApiOperation({
    summary: "获取用户信息",
  })
  @ApiBearerAuth()
  async __getInfo(@Request() req) {

    let openid: string = req.tokenInfo['openid'];
    let user = await this.userService.findByOpenid(openid);

    return {
      code: 1,
      msg: 'ok',
      data: user,
    };
  }

  @Post('update')
  @ApiOperation({
    summary: "更新用户信息",
  })
  @ApiBearerAuth()
  async __updateInfo(@Body() postData: UserInfoDto, @Request() req) {
 
    let openid = req.tokenInfo['openid'];
    let updateRes = await this.userService.updateByOpenid(openid, postData);
    return {
      code: 1,
      msg: 'ok',
      data: updateRes
    }
  }
}

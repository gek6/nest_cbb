import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PhoneMsgService } from "../../../../service/phone-msg/phone-msg.service"
import { JwtAuthService } from "src/service/jwt-auth/jwt-auth.service"

@Controller('api/phone-msg')
@ApiBearerAuth()
@ApiTags("短信")
export class PhoneMsgController {
  constructor(
    private phoneMsgService: PhoneMsgService,
    private jwtAuthService: JwtAuthService
  ) { }

  @ApiOperation({
    summary: "获取短信验证码"
  })
  @Get("verifyCode/:phone")
  @ApiParam({
    name: "phone",
    description: "手机号",
    example: "13149278289"
  })
  async __getCode(
    @Param('phone') phoneNum
  ) {
    let randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
    try {
      await this.phoneMsgService.sendVerifyCodeMsg(phoneNum, randomNum);
      let key = this.jwtAuthService.encodeToken({
        code: randomNum,
      })
      return {
        code: 0,
        msg: 'ok',
        key
      }
    } catch (error) {

      return {
        code: 0,
        msg: '发送失败'
      }
    }

  }
}

import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { UserService } from "../../../../service/user/user.service"
import { JwtAuthService } from "../../../../service/jwt-auth/jwt-auth.service"


@Controller('api/user')
export class UserController {
    constructor
        (
            private userService: UserService,

    ) { }

    @Post("register")
    async __register(@Body() postBody) {
        console.log('进入 register 控制器');
        let code: string = postBody['code'];
        // 如果code 不存在 给出提示
        if (!code) {
            return {
                code: -1,
                msg: '缺少参数'
            }
        }
        let loginRes = await this.userService.wxmpDoLogin(code);

        if (loginRes.errcode) {
            return loginRes;
        } else {
            console.log(loginRes)
            // 这里拿到用户的openid
            let openid = loginRes.openid;
            // 去数据库中查询
            let res = await this.userService.find({
                openid
            })

            if (res.length) {
                // 用户存在
                console.log('用户存在');
                let token = await this.userService.createToken(openid)
                return {
                    code: 1,
                    msg: 'ok',
                    token: token
                }

            } else {
                // 用户不存在
                console.log('用户不存在');
                let token = await this.userService.add({
                    openid,
                })

                if (token) {
                    // 保存成功
                    return {
                        code: 1,
                        msg: 'ok',
                        token: token
                    }
                }
            }
           
       
        }

    }

    @Get("info")
    async __getInfo( @Request() req )
    {

        let openid = req.tokenInfo['openid'];
        let user = await this.userService.findByOpenid(openid)

        return {
            code:1,
            data:user
        }
        // this.userService.find({
        //     openid
        // })
    }
}

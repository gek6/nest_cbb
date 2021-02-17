import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { UserService } from "../../../../service/user/user.service"
import { JwtAuthService } from "../../../../service/jwt-auth/jwt-auth.service"


@Controller('api/user')
export class UserController {
    constructor
        (
            private userService: UserService,
            private jwtAuthService: JwtAuthService
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

        // 这里拿到用户的openid
        let openid = 'owB4742qaKOgi_w-Vc35qldiIFOY';
        // 去数据库中查询
        let res = await this.userService.find({
            openid
        })
        if(res.length){
            // 用户存在
            console.log('用户存在');
            
        }else{
            // 用户不存在
            console.log('用户不存在');
            this.userService.add({
                openid,
            })
        }
        
        return {

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

            console.log(res)
            // 如果有记录，则加密用户主键 并更新表中 sessionkey 返回加密后的token
            // 如果没有记录，则创建一条新记录，并且同上
            return {
                code: 1,
                msg: 'ok'
            };
        }

    }

}

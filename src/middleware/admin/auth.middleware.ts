import { userInfo } from 'os';
import { Injectable, NestMiddleware } from '@nestjs/common';

// 中间件 允许用过的白名单
// 在根模块中 已经限制 匹配 以admin/ 开头的 路由地址 
const whiteList = [
  "/admin/login",
  "/admin/account/getCode"
]


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(req.baseUrl)
    let userInfo = req.session['userInfo'];
    if(whiteList.includes(req.baseUrl)){
      next()
    }else{
      if(userInfo){
        next()
      }else{
        res.redirect("/admin/login")
      }
    }
    
  }
}

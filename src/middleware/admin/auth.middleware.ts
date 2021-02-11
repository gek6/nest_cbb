import { userInfo } from 'os';
import { Injectable, NestMiddleware } from '@nestjs/common';

const whiteList = [
  "/login",
  "/account/getCode"
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
        res.redirect("/login")
      }
    }
    
  }
}

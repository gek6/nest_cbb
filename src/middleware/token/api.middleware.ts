import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtAuthService } from '../../service/jwt-auth/jwt-auth.service';

const whiteList = [
  '/api/user/register',
];

@Injectable()
export class ApiMiddleware implements NestMiddleware {

  constructor
  (
    private jwtAuthService: JwtAuthService,
  ) {
  }

  use(req: any, res: any, next: () => void) {
    console.log(new Date(), '  ->  ',req.baseUrl)
    // 首先判断 请求是否在白名单内
    // console.log(req.baseUrl);
    if (whiteList.includes(req.baseUrl)) {
      next();
      return;
    }

    // 检测接口中是否携带token  authorization:
    let token = req.headers['Authorization'] || req.headers['authorization'] || '';

    if (token) {
      // console.log('校验token');
      try {
        this.jwtAuthService.verifyToken(token);
      } catch (err) {
        // res.json({
        //   code: 401002,
        //   msg: 'token失效',
        // });
      }

      // console.log(tokenInfo);
      // 解析token  并且把 解析后的用户ID 挂载到 当前req实例上
      req.tokenInfo = this.jwtAuthService.decodeToken(token);
      next();
    } else {
      res.json({
        code: 401001,
        msg: '未携带token',
      });
    }

  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService
    ){
        
    }

     // token加密
    encodeToken(data:object){
        return this.jwtService.sign(data)
    }

    // token解密
    decodeToken(tokenStr:string){
        return this.jwtService.decode(tokenStr)
    }

    // 校验token
    verifyToken(token:string){
        return this.jwtService.verify(token)
    }
}

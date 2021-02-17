import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from "axios";
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private __model){

    }
    // 通过微信服务器登录
    async wxmpDoLogin(code){
        const APPID = "wxbaaffd5522678f68";
        const SECRET = "65839f628c9a68d9eb8257e1f88ae7e7";
        let wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`

         
        let httpRes = await axios.get(wxUrl);
        // console.log(httpRes)
        return httpRes.data;
    }

    // 数据库查询
    async find(queryJson = {}){
        return await this.__model.find(queryJson);
    }

    async add(rowJson){
        await this.__model
    }
}

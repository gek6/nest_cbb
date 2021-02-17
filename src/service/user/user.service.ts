import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from "axios";
import * as wxConfig from "../../../config/weixin.config.js";
import { JwtAuthService } from "../jwt-auth/jwt-auth.service"
@Injectable()  
export class UserService {
    constructor(
        private jwtAuthService: JwtAuthService,
        @InjectModel('User') private __model){

    }
    // 通过微信服务器登录
    async wxmpDoLogin(code){
        const APPID = wxConfig.APPID;
        const SECRET = wxConfig.SECRET; 
        let wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`

          
        let httpRes = await axios.get(wxUrl);
        // console.log(httpRes)
        return httpRes.data;
    }

    // 数据库查询
    async find(queryJson = {}){
        return await this.__model.find(queryJson);
    }

    async findByOpenid(openid)
    {
        return await this.__model.findOne({
            openid
        })
    }

    async add(rowJson){
        console.log('add');
        
        let User = new this.__model({
            ...rowJson,
        });
        let saveRes = await User.save();
        console.log(saveRes);
        let token = this.jwtAuthService.encodeToken({
            openid:saveRes.openid
        })
        return token
        
    }


    async createToken(openid)
    {
        let token = this.jwtAuthService.encodeToken({
            openid
        })
        return token
    }


}

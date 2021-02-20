import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import {APPID,SECRET } from '../../../config/weixin.config';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

@Injectable()
export class UserService {
  constructor(
    private jwtAuthService: JwtAuthService,
    @InjectModel('User') private userModel) {

  }

  // 通过微信服务器登录
  async wxmpDoLogin(code) {
  
    let wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;


    let httpRes = await axios.get(wxUrl);
    // console.log(httpRes)
    return httpRes.data;
  }

  // 数据库查询
  async find(queryJson = {}) {
    return await this.userModel.find(queryJson);
  }

  // 查询单个用户
  async findByOpenid(openid:string) {
    return await this.userModel.findOne({
      openid,
    });
  }
  // 新增用户
  async add(rowJson) {
    console.log('add');

    let User = new this.userModel({
      ...rowJson,
    });
    let saveRes = await User.save();


    return this.jwtAuthService.encodeToken({
      openid: saveRes.openid,
    });

  }

  // 创建token
  async createToken(openid) {

    return this.jwtAuthService.encodeToken({
      openid,
    });
  }

  // 更新用户信息
  async updateByOpenid(openid,rowJson){
    console.log('更新用户信息')
    console.log(rowJson)
    return this.userModel.findOneAndUpdate({
      openid: openid,
    }, rowJson, {
      useFindAndModify: false,
      new: true
    });

  }

  // 分页查询 用户列表
  async list(queryJson){
    return this.userModel.paginate(
      {},
      {
        page: Number(queryJson.pageNum),
        limit: Number(queryJson.pageSize),
      },
    );
  }
}

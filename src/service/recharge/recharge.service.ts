import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/service/user/user.service'
import * as dateformat from "dateformat"
@Injectable()
export class RechargeService {
    constructor (
        @InjectModel("Recharge") private rechargeModel ,
        private userService : UserService
    ){}

    async createRechargeLog(openid,money,type){
        let user = await this.userService.findByOpenid(openid);
     
        let randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
        let timeStr = dateformat(new Date(),"yyyymmddHHMMss")
        
         
        // 创建充值日志
        let log = new this.rechargeModel({
            num:timeStr+''+randomNum,
            money,
            uid:user._id,
            type

        });
        let logRes =  await log.save();
  
        return logRes

    }

    /**
     * 查找充值列表 并查询当前用户账户余额
     */
    async findRechargeListAndSearchMoneu(openid){
        let user = await this.userService.findByOpenid(openid);
       
        let list = await this.rechargeModel.find({
            uid:user._id
        })
        return {
            money:user.money,
            rechargeLog:list
        }
    }
}

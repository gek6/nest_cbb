import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import { UserService } from "src/service/user/user.service"
@Injectable()
export class CallbackService {
    constructor (
        @InjectModel("Recharge") private rechargeModel ,
        @InjectModel("User") private userModel ,
        // private UserService : UserService
    ){}

    async __paySuccAndUpdateRechargeLogAndUpdateUserMoney(num){
        // 1 查找充值流水
        let log = await this.rechargeModel.findOne({
            num
        });
        
        // 2 查找用户 更新用户余额
        if(log.status===0){
            let user =  await this.userModel.findById(log.uid);
            user.money = user.money + log.money;
            user.save();
            log.status = 1;
            log.save()
            return true
        }else{
           return true
        }
        
        
    }

}

import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    // 微信小程序openid
    openid:String,
    // 用户昵称
    "nickName" : String,
    // 用户性别 1男 2女
    "sex" :  String,
    // 手机号
    "mobile" : String,
    // 邮箱
    "email" : String,
    // 账号状态 1 正常 -1冻结
    "status" : {
        type:String,
        default:'1'
    },
    // 用户类型 1普通用户，2铲屎官
    "type":{
        type:String,
        default:'1'
    },
    // 余额 单位分
    "money":{
        type:Number,
        default:0
    },
    // 创建时间 毫秒时间戳
    "create_time" : {
        type:Date,
        default:Date.now
    }
})
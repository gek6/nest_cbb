import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongoosePaginate from "mongoose-paginate"
let rechargeSchema = new mongoose.Schema({
    // 订单号
    num:String,
    // 金额 单位分
    'money':Number,
    // 类型 1-充值 2-提现
    'type':Number,
    // 用户ID
    'uid': Schema.Types.ObjectId,
    // 状态 0 未付款 1已付款
    'status': {
        type: Number,
        default: 0,
    },

    // 创建时间 毫秒时间戳
    'create_time': {
        type: Date,
        default: Date.now,
    },

    'pay_time':{
        type: Date,
    }


});
rechargeSchema.plugin(mongoosePaginate);
export const RechargeSchema = rechargeSchema

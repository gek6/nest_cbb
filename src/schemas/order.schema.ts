import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongoosePaginate  from "mongoose-paginate"
let modelSchema = new mongoose.Schema({
  // 订单号 数字类型
  'orderNum':Number,

  // 用户ID
  'uid':Schema.Types.ObjectId,
  // 上门服务的日期数组 数组中有每次服务的 信息对象
  'serviceDates':Array,

  
  // 账号状态 1 正常 -1冻结
  'status': {
    type: Number,
    default: 1,
  },

  // 创建时间 毫秒时间戳
  'create_time': {
    type: Date,
    default: Date.now,
  },

  'delete_time':{
    type: Date
  },


});
modelSchema.plugin(mongoosePaginate);
export const OrderSchema = modelSchema

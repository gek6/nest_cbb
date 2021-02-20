import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongoosePaginate  from "mongoose-paginate"
let addressSchema = new mongoose.Schema({
  // 经度
  'lng':Number,
  // 纬度
  'lat':Number,
  // 省
  'province':String,
  // 市
  'city':String,
  // 区
  'district':String,
  // 详细地址
  'address_detail':String,
  // 联系人
  'name':String,
  // 联系电话
  'phone':String,
  // 用户ID
  'uid':Schema.Types.ObjectId,
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
addressSchema.plugin(mongoosePaginate);
export const AddressSchema = addressSchema

import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({

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

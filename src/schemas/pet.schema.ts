import * as mongoose from 'mongoose';
import * as mongoosePaginate  from "mongoose-paginate"
let petSchema = new mongoose.Schema({

  // 宠物名称
  'name':String,
  // 性别 1男 2女
  'gender': {
    type: Number,
    default: 1,
  },
  // 是否绝育 1是 2否
  'jueyu': {
    type: Number,
    default: 1,
  },
  // 是否需要额外玩耍 1是 2否
  'play': {
    type: Number,
    default: 1,
  },
  // 是否亲近陌生人 1是 2否
  'friendly': {
    type: Number,
    default: 1,
  },
  // 是否打疫苗 jsonString
  'yimiao': {
    type: String,
    default: "",
  },
  // 是否驱虫 jsonString
  'quchong': {
    type: String,
    default: "",
  },
  // 猫粮或猫砂的摆放位置 照片
  'food_position_img':String,
  // 宠物头像
  'pet_img':String,
  // 宠物病史 jsonString
  'bingshi':String,
  // 体重
  'weight':String,
  // 用户ID
  'uid':mongoose.Schema.Types.ObjectId,

  // 创建时间 毫秒时间戳
  'create_time': {
    type: Date,
    default: Date.now,
  },

  'delete_time':{
    type: Date
  },


});
petSchema.plugin(mongoosePaginate);
export const PetSchema = petSchema

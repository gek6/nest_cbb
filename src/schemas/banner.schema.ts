import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongoosePaginate from "mongoose-paginate"
let bannerSchema = new mongoose.Schema({

    // 轮播图 标题
    'title': String,
    // 跳转的URL地址
    'url':String,
    // 图片地址
    'img_url': String,
    // 排序 权重 越大的 越考前，前端显示的时候排序即可
    'sort':Number,

    // 启用状态 1 正常 0禁用
    'status': {
        type: Number,
        default: 1,
    },

    // 创建时间 毫秒时间戳
    'create_time': {
        type: Date,
        default: Date.now,
    },

    'delete_time': {
        type: Date
    },


});
bannerSchema.plugin(mongoosePaginate);
export const BannerSchema = bannerSchema
